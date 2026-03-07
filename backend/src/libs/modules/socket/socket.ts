import { Socket } from './base-socket.module.js';
import { gameStore } from '~/features/game-store/game-store.js';
import { token as tokenService } from '../token/token.js';
import { userService } from '~/features/users/users.js';
import { logger } from '../logger/logger.js';

const socketService = new Socket({
    logger,
    store: gameStore,
    userService,
    tokenService,
});

export { socketService };
