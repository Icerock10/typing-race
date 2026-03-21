import { initChat, initLobby, initRace } from './handlers/handlers.js';
import { type DepHandlers } from './libs/types/dep-handlers.type.js';
import { gameModel } from './game.model.js';
import { GameController } from './game.controller.js';
import { GameRepository } from './game.repository.js';
import { GameService } from './game.service.js';
import { logger } from '~/libs/modules/logger/logger.js';

const gameRepository = new GameRepository(gameModel);
const gameService = new GameService({ gameRepository });
const gameController = new GameController({ logger, gameService });

const initHandlers = (deps: DepHandlers): void => {
    const { chatHandler } = initChat({ socket: deps.socket, io: deps.io });
    initLobby({ ...deps, chat: chatHandler });
    initRace({ ...deps, gameService });
};

export { gameStore } from './store/game-store.js';
export { initHandlers, gameController };
export { ConnectionHandler } from './handlers/handlers.js';
