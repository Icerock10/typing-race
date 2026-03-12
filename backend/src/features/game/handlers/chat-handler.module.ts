import { type Server as SocketServer, type Socket as TSocket } from 'socket.io';
import {
    RaceChatSocketEvent,
    SocketNamespace,
} from '~/libs/modules/socket/libs/enums/enums.js';
import { type GameStore } from '../store/base-game-store.module.js';

import { type UserDto } from '../store/types/types.js';

type User = Record<'user', UserDto>;

type Constructor = {
    socket: TSocket;
    io: SocketServer;
    store: GameStore;
};

class ChatHandler {
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
        this.socket.on(RaceChatSocketEvent.SEND_MESSAGE, this.sendMessage);
    }

    private sendMessage = ({
        message,
        roomId,
    }: {
        message: string;
        roomId: string;
    }): void => {
        const { userName } = (this.socket.data as User).user;
        const sentAt = Date.now();

        this.io
            .of(SocketNamespace.GAME)
            .to(roomId)
            .emit(RaceChatSocketEvent.NEW_MESSAGE, {
                message,
                userName,
                sentAt,
            });
    };

    public sendSystemMessage(roomId: string, message: string): void {
        const sentAt = Date.now();
        const SYSTEM_USER_NAME = 'System';

        this.io
            .of(SocketNamespace.GAME)
            .to(roomId)
            .emit(RaceChatSocketEvent.NEW_MESSAGE, {
                message,
                userName: SYSTEM_USER_NAME,
                sentAt,
                isSystem: true,
            });
    }
}

export { ChatHandler };
