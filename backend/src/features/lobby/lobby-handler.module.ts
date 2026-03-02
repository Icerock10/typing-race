import { type Logger } from '~/libs/modules/logger/libs/types/types.js';
import { type Server as SocketServer, type Socket as TSocket } from 'socket.io';
import { SocketEvent } from '~/libs/modules/socket/libs/enums/enums.js';
import { type GameStore } from '../game-state/base-game-store.module.js';
import { type GameResultDto, type RoomStateDto } from '~/libs/types/types.js';

type PlayerResult = GameResultDto & { roomId: string; token: string };

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
        this.socket.on(SocketEvent.CREATE_ROOM, this.createRoom);
        this.socket.on(SocketEvent.JOIN_ROOM, this.joinRoom);
    }

    private createRoom = ({
        roomData,
        playerData,
    }: {
        roomData: RoomStateDto;
        playerData: PlayerResult;
    }): void => {
        const { roomId } = roomData;

        this.store.addUser(this.socket.id, { ...playerData, roomId });

        this.store.addRoom(roomId, {
            ...roomData,
            players: new Set([this.socket.id]),
        });

        void this.socket.join(roomId);
    };

    private joinRoom = ({ playerData }: { playerData: PlayerResult }): void => {
        const { roomId } = playerData;
        const room = this.store.getRoom(roomId);

        if (!room) {
            return;
        }

        if (room.players.size >= room.playersCount) {
            return;
        }

        this.store.addUser(this.socket.id, {
            ...playerData,
            roomId,
        });

        void this.socket.join(roomId);

        this.store.addPlayerToRoom(this.socket.id, room);
    };
}

export { LobbyHandler };
