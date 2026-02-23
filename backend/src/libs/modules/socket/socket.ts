import { Socket } from './base-socket.module.js';
import { logger } from '../logger/logger.js';

const socketService = new Socket({ logger });

export { socketService };
