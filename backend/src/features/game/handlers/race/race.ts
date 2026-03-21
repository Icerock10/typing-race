import { RaceHandler } from './race-handler.module.js';
import { type DepHandlers } from '../../libs/types/types.js';
import { RaceService } from './race-service.module.js';
import { type GameService } from '../../game.service.js';

type Dependecies = Omit<DepHandlers, 'userService'> & {
    gameService: GameService;
};

const initRace = (deps: Dependecies): void => {
    const { socket, io, store, gameService } = deps;
    const raceService = new RaceService({ store, gameService });
    new RaceHandler({ socket, io, raceService });
};

export { initRace };
