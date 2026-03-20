import { type Socket as TSocket } from 'socket.io';
import { type UserService } from '~/features/users/user.service.js';
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
type CreateRoomPayload = { roomData: RoomPayload; socket: TSocket };
type UpdateUserAuthPayload = {
    userId: string;
    socket: TSocket;
};
type Service = {
    createRoom: (payload: CreateRoomPayload) => {
        room: RoomResponseDto;
        roomId: string | null;
    };
    updateUserAuth: (payload: UpdateUserAuthPayload) => Promise<void>;
    joinRoom: (payload: RoomBasePayload) => {
        user: UserDto;
        room: RoomResponseDto;
    } | null;
    leaveRoom: (payload: RoomBasePayload) => {
        user: UserDto;
        room: RoomResponseDto;
    } | null;
    scheduleRoomDeletion(roomId: string, onDelete: () => void): void;
    getUserFromSocketData: (socket: TSocket) => UserDto | null;
    getActiveRooms: () => RoomResponseDto[];
};

type Constructor = {
    store: GameStore;
    userService: UserService;
    chat: ChatHandler;
};

class LobbyService implements Service {
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
    }: CreateRoomPayload): ReturnType<Service['createRoom']> => {
        const roomId = crypto.randomUUID();
        const { user } = socket.data as Record<'user', UserDto>;

        const players = new Map<string, Player>();

        players.set(String(user.id), {
            user,
            socketId: socket.id,
        });

        const createdRoom = this.store.addRoom(roomId, {
            ...roomData,
            players,
            status: GameStatus.WAITING,
            roomId,
            hostId: String(user.id),
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

    public joinRoom = ({
        socket,
        roomId,
    }: RoomBasePayload): ReturnType<Service['joinRoom']> => {
        const { user } = socket.data as Record<'user', UserDto | null>;

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
    }: RoomBasePayload): ReturnType<Service['leaveRoom']> => {
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
