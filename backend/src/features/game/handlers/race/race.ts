import { RaceHandler } from './race-handler.module.js';
import { type DepHandlers } from '../../libs/types/dep-handlers.type.js';

const initRace = (deps: DepHandlers): void => {
    new RaceHandler(deps);
};

export { initRace };
