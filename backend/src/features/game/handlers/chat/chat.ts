import { ChatHandler } from './chat-handler.module.js';
import { type DepHandlers } from '../../libs/types/dep-handlers.type.js';

const initChat = (deps: DepHandlers): { chatHandler: ChatHandler } => {
    const chatHandler = new ChatHandler(deps);
    return { chatHandler };
};

export { initChat };
