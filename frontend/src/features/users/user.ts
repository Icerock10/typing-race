import { config } from '~/libs/modules/config/config.js';
import { http } from '~/libs/modules/http/http.js';

import { UserApi } from './user-api.js';

const userApi = new UserApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    http,
});

export { userApi };
export { actions, reducer } from './slices/user.js';
