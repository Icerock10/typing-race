import { initChat, initLobby, initRace } from './handlers/handlers.js';
import { type DepHandlers } from './libs/types/dep-handlers.type.js';

const initHandlers = (deps: DepHandlers): void => {
    const { chatHandler } = initChat(deps);
    initLobby({ ...deps, chat: chatHandler });
    initRace(deps);
};

export { gameStore } from './store/game-store.js';
export { initHandlers };
export { ConnectionHandler } from './handlers/handlers.js';
