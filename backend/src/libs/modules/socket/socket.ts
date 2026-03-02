import { Socket } from './base-socket.module.js';
import { gameStore } from '~/features/game-state/game-store.js';
import { logger } from '../logger/logger.js';

const socketService = new Socket({ logger, store: gameStore });

export { socketService };
