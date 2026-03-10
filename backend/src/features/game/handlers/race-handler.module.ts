import { type Server as SocketServer, type Socket as TSocket } from 'socket.io';
import { RaceSocketEvent } from '~/libs/modules/socket/libs/enums/enums.js';
import { type GameStore } from '../store/base-game-store.module.js';
import { SocketNamespace, type UserDto } from 'shared';

type Constructor = {
    socket: TSocket;
    io: SocketServer;
    store: GameStore;
};

class RaceHandler {
    private socket;
    private io;
    private store;

    constructor({ socket, io, store }: Constructor) {
        this.socket = socket;
        this.io = io;
        this.store = store;
        this.registerEvents();
    }

    private registerEvents(): void {
        this.socket.on(RaceSocketEvent.SET_READY_STATUS, this.setReadyStatus);
    }

    private setReadyStatus = ({
        roomId,
        isReady,
    }: {
        roomId: string;
        isReady: boolean;
    }): void => {
        const { user } = this.socket.data as Record<'user', UserDto>;
        const roomWithUpdatedPlayerStatus = this.store.setPlayerReadyStatus(
            roomId,
            String(user.id),
            isReady,
        );
        this.io
            .of(SocketNamespace.GAME)
            .to(roomId)
            .emit(
                RaceSocketEvent.SET_READY_STATUS,
                roomWithUpdatedPlayerStatus,
            );
    };
}

export { RaceHandler };
