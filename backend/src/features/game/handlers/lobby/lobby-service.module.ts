import { type Socket as TSocket } from 'socket.io';
import { type UserService } from '~/features/users/user.service.js';
import { ROOM_CONFIG } from '../../libs/constants/room-config.constant.js';
import { GameStatus } from '~/libs/enums/enums.js';
import {
    type UserDto,
    type RoomPayload,
    type RoomResponseDto,
} from '~/libs/types/types.js';
import { type Player } from '../../libs/types/types.js';
import { type GameStore } from '../../store/base-game-store.module.js';
import { type ChatHandler } from '../chat/chat-handler.module.js';

type RoomBasePayload = { roomId: string; socket: TSocket };

type RoomBaseReturn = {
    user: UserDto;
    room: RoomResponseDto;
} | null;

type CreateRoomPayload = { roomData: RoomPayload; socket: TSocket };

type UpdateUserAuthPayload = {
    userId: string;
    socket: TSocket;
};

type Constructor = {
    store: GameStore;
    userService: UserService;
    chat: ChatHandler;
};

class LobbyService {
    private store;
    private userService;
    private chat;

    constructor({ store, userService, chat }: Constructor) {
        this.store = store;
        this.userService = userService;
        this.chat = chat;
    }

    public createRoom = ({
        roomData,
        socket,
    }: CreateRoomPayload): {
        room: RoomResponseDto;
        roomId: string | null;
    } => {
        const roomId = crypto.randomUUID();
        const user = this.getUserFromSocketData(socket);
        const { timeForGame } = ROOM_CONFIG[roomData.difficulty];
        const texts = ROOM_CONFIG[roomData.difficulty][roomData.language];
        const randomText = texts[Math.floor(Math.random() * texts.length)];

        const players = new Map<string, Player>();

        players.set(String(user?.id), {
            user: user as UserDto,
            socketId: socket.id,
        });

        const createdRoom = this.store.addRoom(roomId, {
            ...roomData,
            players,
            status: GameStatus.WAITING,
            roomId,
            hostId: String(user?.id),
            text: randomText,
            timeForGame,
        });
        return { room: createdRoom, roomId: createdRoom.roomId };
    };

    public updateUserAuth = async ({
        userId,
        socket,
    }: UpdateUserAuthPayload): Promise<void> => {
        try {
            const user = await this.userService.find(userId);
            (socket.data as Record<'user', UserDto | null>).user = user;
            this.store.removeUser(socket.id);
            this.store.addUser(userId, socket.id);
        } catch {
            this.store.addUser(socket.id, null);
        }
    };

    public joinRoom = ({ socket, roomId }: RoomBasePayload): RoomBaseReturn => {
        const user = this.getUserFromSocketData(socket);

        const player = user
            ? {
                  socketId: socket.id,
                  user,
              }
            : null;

        const room = this.store.onJoinRoom(roomId, player);

        if (!user || !room) {
            return null;
        }

        if (room.hostId === user.id) {
            this.store.cancelGameTimer(roomId);
        }

        return { user, room };
    };

    public leaveRoom = ({
        socket,
        roomId,
    }: RoomBasePayload): RoomBaseReturn => {
        const user = this.getUserFromSocketData(socket);
        const playerId = user ? user.id : null;

        const room = this.store.onLeaveRoom(roomId, playerId);
        if (!user || !room) {
            return null;
        }
        return { user, room };
    };

    public scheduleRoomDeletion(roomId: string, onDelete: () => void): void {
        const DELAY = 5000;
        const timer = setTimeout(() => {
            this.store.deleteRoom(roomId);
            onDelete();
            this.store.cancelGameTimer(roomId);
        }, DELAY);

        this.store.setGameTimer(roomId, timer);
    }

    public getUserFromSocketData = (socket: TSocket): UserDto | null => {
        const { user } = socket.data as Record<'user', UserDto | null>;
        return user ?? null;
    };

    public getActiveRooms = (): RoomResponseDto[] => {
        return this.store.getAllRooms();
    };
}

export { LobbyService };
