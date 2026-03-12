import { type Server } from 'node:http';
import { type GameStore } from '~/features/game/store/base-game-store.module.js';
import {
    LobbyHandler,
    RaceHandler,
    ChatHandler,
} from '~/features/game/game.js';
import { config } from '../config/config.js';
import { type UserDto } from '~/libs/types/types.js';
import { type SocketService } from './libs/types/types.js';
import {
    SocketEvent,
    SocketNamespace,
    LobbySocketEvent,
} from './libs/enums/enums.js';
import { type BaseToken } from '../token/base-token.module.js';
import { type UserService } from '~/features/users/user.service.js';
import { type Logger } from '../logger/libs/types/logger.type.js';
import { Server as SocketServer, type Socket as TSocket } from 'socket.io';
import { AuthorizationError } from '~/libs/enums/enums.js';

type Constructor = {
    logger: Logger;
    userService: UserService;
    store: GameStore;
    tokenService: BaseToken;
};

class Socket implements SocketService {
    private _io!: SocketServer;
    private logger: Logger;
    private store: GameStore;
    private userService: UserService;
    private tokenService: BaseToken;

    public get io(): SocketServer {
        return this._io;
    }

    constructor({ logger, store, userService, tokenService }: Constructor) {
        this.logger = logger;
        this.store = store;
        this.userService = userService;
        this.tokenService = tokenService;
    }

    public initializeIo = (server: Server): void => {
        this._io = new SocketServer(server, {
            cors: { origin: config.ENV.APP.CLIENT_DEVELOPMENT_SERVER_URL },
        });
        this._io
            .of(SocketNamespace.NOTIFICATION)
            .on(SocketEvent.CONNECTION, (socket) => {
                this.notificationHandler(socket);
            });
        this._io
            .of(SocketNamespace.GAME)
            .on(SocketEvent.CONNECTION, (socket) => {
                void this.handleHandShake(socket);

                this.initHandlers(socket);

                socket.on(SocketEvent.DISCONNECT, () => {
                    this.store.removeUser(socket.id);
                    this.emitStats();
                });
                this.emitStats();
            });
    };

    private handleHandShake = async (socket: TSocket): Promise<void> => {
        this.store.addUser(socket.id, null);
        const token = socket.handshake.auth['token'] as string;
        if (token) {
            try {
                const { userId } = await this.tokenService.decode(token);

                const userData = await this.userService.find(userId);

                if (!userData || !socket.connected) {
                    throw new AuthorizationError();
                }
                (socket.data as Record<'user', UserDto>).user = userData;
                this.store.addUser(socket.id, userId);
            } catch {
                this.logger.warn(
                    `Invalid token for socket: ${socket.id}, treating as guest`,
                );
            }
        }
    };

    private initHandlers = (socket: TSocket): void => {
        const chatHandler = new ChatHandler({
            socket,
            io: this._io,
            store: this.store,
        });
        new LobbyHandler({
            socket,
            io: this._io,
            store: this.store,
            emitStats: this.emitStats,
            userService: this.userService,
            chat: chatHandler,
        });
        new RaceHandler({
            socket,
            io: this._io,
            store: this.store,
        });
    };

    private emitStats = (): void => {
        const getOnlinePlayersAndRooms = this.store.getStats();
        this.io
            .of(SocketNamespace.GAME)
            .emit(LobbySocketEvent.STATS_INFO, getOnlinePlayersAndRooms);
    };

    private notificationHandler = (socket: TSocket): void => {
        socket.on(SocketEvent.NOTIFICATION_JOIN_ROOM, (roomId: string) => {
            void socket.join(roomId);
        });

        socket.on(SocketEvent.NOTIFICATION_LEAVE_ROOM, (roomId: string) => {
            void socket.leave(roomId);
        });
    };
}

export { Socket };
