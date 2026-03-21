import { APIPath, ContentType, HTTPRequestMethod } from '~/libs/enums/enums.js';
import { BaseHTTPApi } from '~/libs/modules/api/api.js';
import { type HTTP } from '~/libs/modules/http/http.js';
import { type GameDto } from './libs/types/types.js';

import { GamesApiPath } from './libs/enums/enums.js';

type Constructor = {
    baseUrl: string;
    http: HTTP;
};

class GameApi extends BaseHTTPApi {
    public constructor({ baseUrl, http }: Constructor) {
        super({ baseUrl, http, path: APIPath.GAMES });
    }
    public async getAllGames(): Promise<GameDto[]> {
        const response = await this.load(
            this.getFullEndpoint(GamesApiPath.ROOT, {}),
            {
                contentType: ContentType.JSON,
                hasAuth: false,
                method: HTTPRequestMethod.GET,
            },
        );

        return await response.json<GameDto[]>();
    }
}

export { GameApi };
