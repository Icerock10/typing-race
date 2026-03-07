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
    };
}

export { LobbyHandler };
