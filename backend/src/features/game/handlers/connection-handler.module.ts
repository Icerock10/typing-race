import { type Server as SocketServer, type Socket as TSocket } from 'socket.io';
import {
    SocketNamespace,
    LobbySocketEvent,
    RaceSocketEvent,
} from '~/libs/modules/socket/libs/enums/enums.js';
import { type GameStore } from '~/features/game/store/base-game-store.module.js';
import { type BaseToken } from '~/libs/modules/token/token.js';
import { type UserDto } from '~/libs/types/types.js';
import { type UserService } from '~/features/users/user.service.js';
import { type Logger } from '~/libs/modules/logger/libs/types/types.js';

type User = Record<'user', UserDto | undefined>;

type Constructor = {
    io: SocketServer;
    store: GameStore;
    logger: Logger;
    userService: UserService;
    tokenService: BaseToken;
};

class ConnectionHandler {
    private readonly RECONNECT_TIMEOUT = 5000;
    private tokenService;
    private userService;
    private store;
    private logger;
    private io;
    constructor({ tokenService, io, store, userService, logger }: Constructor) {
        this.tokenService = tokenService;
        this.io = io;
        this.store = store;
        this.userService = userService;
        this.logger = logger;
    }

    public handleConnect = async (socket: TSocket): Promise<void> => {
        await this.authenticate(socket);
        this.emitStats();
        const userId = (socket.data as User).user?.id;
        if (userId) {
            const existingTimer = this.store.gameTimers.get(userId);
            if (existingTimer) {
                clearTimeout(existingTimer);
                this.store.gameTimers.delete(userId);
            }
            await this.handleReconnect(socket, userId);
        }
    };

    private authenticate = async (socket: TSocket): Promise<void> => {
        const token = socket.handshake.auth['token'] as string;
        try {
            const { userId } = await this.tokenService.decode(token);

            const userData = await this.userService.find(userId);

            if (!userData || !socket.connected) {
                return;
            }
            (socket.data as User).user = userData;
            this.store.addUser(userId, socket.id);
        } catch {
            this.logger.warn(
                `Invalid token for socket: ${socket.id}, treating as guest`,
            );
            this.store.addUser(socket.id, null);
        }
    };

    private handleReconnect = async (
        socket: TSocket,
        userId: string,
    ): Promise<void> => {
        const room = this.store.findRoomByUserId(userId);

        if (!room) {
            return;
        }

        await socket.join(String(room.roomId));

        const playerProgress = room.players.find(
            (player) => player.id === userId,
        );

        socket.emit(RaceSocketEvent.PLAYER_RECONNECTED, {
            room,
            playerProgress: {
                wpm: playerProgress?.wpm,
                accuracy: playerProgress?.accuracy,
                errors: playerProgress?.errors,
                progress: playerProgress?.progress,
            },
        });
    };

    public handleDisconnect = (socket: TSocket): void => {
        const userId = (socket.data as User).user?.id;
        if (!userId) {
            this.store.removeUser(socket.id);
            this.emitStats();
            return;
        }

        const timer = setTimeout(() => {
            this.store.removeUser(userId);
            this.store.gameTimers.delete(userId);
            this.emitStats();
        }, this.RECONNECT_TIMEOUT);

        this.store.gameTimers.set(userId, timer);
    };

    private emitStats = (): void => {
        const getOnlinePlayersAndRooms = this.store.getStats();
        this.io
            .of(SocketNamespace.GAME)
            .emit(LobbySocketEvent.STATS_INFO, getOnlinePlayersAndRooms);
    };
}

export { ConnectionHandler };
