import { config } from '~/libs/modules/config/config.js';
import { http } from '~/libs/modules/http/http.js';

import { GameApi } from './game-api.js';

const gameApi = new GameApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    http,
});

export { gameApi };
export { actions, reducer } from './slices/game.js';
