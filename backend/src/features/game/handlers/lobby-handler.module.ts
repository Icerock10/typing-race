import { type Server as SocketServer, type Socket as TSocket } from 'socket.io';
import { type UserService } from '../../users/user.service.js';
import { GameStatus } from '~/libs/enums/enums.js';
import {
    SocketNamespace,
    LobbySocketEvent,
} from '~/libs/modules/socket/libs/enums/enums.js';
import { type UserDto, type RoomPayload } from '~/libs/types/types.js';
import { type Player } from '../store/types/types.js';
import { type GameStore } from '../store/base-game-store.module.js';
import { type ChatHandler } from './chat-handler.module.js';

type Constructor = {
    socket: TSocket;
    io: SocketServer;
    store: GameStore;
    userService: UserService;
    chat: ChatHandler;
};

class LobbyHandler {
    private socket;
    private io;
    private store;
    private userService;
    private chat;

    constructor({ socket, io, store, userService, chat }: Constructor) {
        this.socket = socket;
        this.io = io;
        this.store = store;
        this.userService = userService;
        this.registerEvents();
        this.chat = chat;
    }

    private registerEvents(): void {
        this.socket.on(LobbySocketEvent.CREATE_ROOM, this.createRoom);
        this.socket.on(LobbySocketEvent.JOIN_ROOM, this.joinRoom);
        this.socket.on(LobbySocketEvent.LEAVE_ROOM, this.leaveRoom);
        this.socket.on(LobbySocketEvent.REFRESH_ROOM, this.getActiveRooms);
        this.socket.on(LobbySocketEvent.AUTH_UPDATE, this.updateUserAuth);
    }

    private createRoom = (roomData: RoomPayload): void => {
        const roomId = crypto.randomUUID();
        const { user } = this.socket.data as Record<'user', UserDto>;

        const players = new Map<string, Player>();

        players.set(String(user.id), {
            user,
            socketId: this.socket.id,
        });

        const createdRoom = this.store.addRoom(roomId, {
            ...roomData,
            players,
            status: GameStatus.WAITING,
            roomId,
            hostId: String(user.id),
        });

        void this.socket.join(roomId);
        this.socket.emit(LobbySocketEvent.CREATE_ROOM, createdRoom);
        this.socket.broadcast.emit(LobbySocketEvent.CREATE_ROOM, createdRoom);
    };

    private updateUserAuth = async ({
        userId,
    }: {
        userId: string;
    }): Promise<void> => {
        try {
            const user = await this.userService.find(userId);
            (this.socket.data as Record<'user', UserDto | null>).user = user;
            this.store.removeUser(this.socket.id);
            this.store.addUser(userId, this.socket.id);
        } catch {
            this.store.addUser(this.socket.id, null);
        }
    };

    private joinRoom = ({ roomId }: { roomId: string }): void => {
        const { user } = this.socket.data as Record<'user', UserDto | null>;
        const player = user
            ? {
                  socketId: this.socket.id,
                  user,
              }
            : null;

        const room = this.store.onJoinRoom(roomId, player);

        void this.socket.join(roomId);
        this.socket.emit(LobbySocketEvent.JOIN_ROOM, room);

        if (user) {
            this.socket.broadcast.emit(LobbySocketEvent.JOIN_ROOM, room);
        }
        if (user && room?.hostId === user.id) {
            this.store.cancelGameTimer(roomId);
        }
    };
    private leaveRoom = ({ roomId }: { roomId: string }): void => {
        const { user } = this.socket.data as Record<'user', UserDto | null>;
        const playerId = user ? user.id : null;

        const room = this.store.onLeaveRoom(roomId, playerId);

        void this.socket.leave(roomId);
        this.socket.emit(LobbySocketEvent.LEAVE_ROOM, room);

        if (user) {
            this.socket.broadcast.emit(LobbySocketEvent.LEAVE_ROOM, room);
        }
        if (user && room?.hostId === user.id) {
            this.scheduleRoomDeletion(roomId);
        }
    };

    private scheduleRoomDeletion(roomId: string): void {
        const DELAY = 5000;
        const timer = setTimeout(() => {
            this.store.deleteRoom(roomId);
            this.io
                .of(SocketNamespace.GAME)
                .emit(LobbySocketEvent.ROOM_DELETED, { roomId });
            this.store.cancelGameTimer(roomId);
        }, DELAY);

        this.store.setGameTimer(roomId, timer);
    }

    private getActiveRooms = (): void => {
        const rooms = this.store.getAllRooms();

        this.socket.emit(LobbySocketEvent.REFRESH_ROOM, rooms);
    };
}

export { LobbyHandler };
