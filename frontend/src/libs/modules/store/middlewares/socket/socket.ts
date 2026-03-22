import { socketManager } from '../../../socket/socket-manager.js';
import { storage, StorageKey } from '~/libs/modules/storage/storage.js';
import { SocketNamespace } from '~/libs/enums/enums.js';
import { config } from '~/libs/modules/config/config.js';

const socket = socketManager.getSocket(
    `${config.ENV.API.BASE_URL}${SocketNamespace.GAME}`,
);

const connectSocket = async (): Promise<void> => {
    const token = await storage.get(StorageKey.TOKEN);

    socket.auth = { token };
    if (!socket.connected) {
        socket.connect();
    }
};

void connectSocket();

export { socket };
export { lobbySocketMiddleware } from './lobby-socket-middleware.js';
export { gameSocketMiddleware } from './game-socket-middleware.js';
