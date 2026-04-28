import { APIPath, ContentType, HTTPRequestMethod } from '~/libs/enums/enums.js';
import { BaseHTTPApi } from '~/libs/modules/api/api.js';
import { type HTTP } from '~/libs/modules/http/http.js';
import { UsersApiPath } from 'shared';
import { type UserDto } from '~/libs/types/types.js';

type Constructor = {
    baseUrl: string;
    http: HTTP;
};

class UserApi extends BaseHTTPApi {
    public constructor({ baseUrl, http }: Constructor) {
        super({ baseUrl, http, path: APIPath.USERS });
    }
    public async getAll(): Promise<UserDto[]> {
        const response = await this.load(
            this.getFullEndpoint(UsersApiPath.ROOT, {}),
            {
                contentType: ContentType.JSON,
                hasAuth: false,
                method: HTTPRequestMethod.GET,
            },
        );

        return await response.json<UserDto[]>();
    }
}

export { UserApi };
