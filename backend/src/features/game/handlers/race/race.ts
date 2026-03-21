import { RaceHandler } from './race-handler.module.js';
import { type DepHandlers } from '../../libs/types/dep-handlers.type.js';
import { RaceService } from './race-service.module.js';

const initRace = (deps: Omit<DepHandlers, 'userService'>): void => {
    const { socket, io, store } = deps;
    const raceService = new RaceService({ store });
    new RaceHandler({ socket, io, raceService });
};

export { initRace };
