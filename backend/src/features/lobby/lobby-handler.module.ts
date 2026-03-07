import { type Logger } from '~/libs/modules/logger/libs/types/types.js';
import { type Server as SocketServer, type Socket as TSocket } from 'socket.io';
import { GameStatus } from '~/libs/enums/enums.js';
import { SocketEvent } from '~/libs/modules/socket/libs/enums/enums.js';
import { type UserDto, type RoomPayload } from '~/libs/types/types.js';
import { type GameStore } from '../game-store/base-game-store.module.js';

type Player = {
    socketId: string;
    user: UserDto;
};

type Constructor = {
    socket: TSocket;
    io: SocketServer;
    store: GameStore;
    logger: Logger;
};

class LobbyHandler {
    private socket;
    private io;
    private store;
    private logger;
    constructor({ socket, io, store, logger }: Constructor) {
        this.socket = socket;
        this.io = io;
        this.store = store;
        this.logger = logger;
        this.registerEvents();
    }

    private registerEvents(): void {
        this.socket.on(SocketEvent.LOBBY_CREATE_ROOM, this.createRoom);
        this.socket.on(SocketEvent.LOBBY_JOIN_ROOM, this.joinRoom);
        this.socket.on(SocketEvent.LOBBY_LEAVE_ROOM, this.leaveRoom);
        this.socket.on(SocketEvent.LOBBY_REFRESH_ROOM, this.getActiveRooms);
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
            status: GameStatus.IN_PROGRESS,
            roomId,
        });

        void this.socket.join(roomId);
        this.socket.emit(SocketEvent.LOBBY_CREATE_ROOM, createdRoom);
        this.socket.broadcast.emit(SocketEvent.LOBBY_CREATE_ROOM, createdRoom);
    };

    private joinRoom = ({ roomId }: { roomId: string }): void => {
        const { user } = this.socket.data as Record<'user', UserDto>;
        const room = this.store.onJoinRoom(roomId, {
            socketId: this.socket.id,
            user,
        });
        void this.socket.join(roomId);
        this.socket.emit(SocketEvent.LOBBY_JOIN_ROOM, room);
        this.socket.to(roomId).emit(SocketEvent.LOBBY_JOIN_ROOM, room);
    };
    private leaveRoom = ({ roomId }: { roomId: string }): void => {
        const { user } = this.socket.data as Record<'user', UserDto>;

        const room = this.store.onLeaveRoom(
            roomId,
            user.id as NonNullable<string>,
        );
        void this.socket.leave(roomId);

        this.socket.emit(SocketEvent.LOBBY_LEAVE_ROOM, room);
        this.socket.to(roomId).emit(SocketEvent.LOBBY_LEAVE_ROOM, room);
    };
    private getActiveRooms = (): void => {
        const rooms = this.store.getAllRooms();

        this.socket.emit(SocketEvent.LOBBY_REFRESH_ROOM, rooms);
    };
}

export { LobbyHandler };
