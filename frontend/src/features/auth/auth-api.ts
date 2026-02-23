import { APIPath, ContentType, HTTPRequestMethod } from '~/libs/enums/enums.js';
import { BaseHTTPApi } from '~/libs/modules/api/api.js';
import { type HTTP } from '~/libs/modules/http/http.js';
import { type Storage } from '~/libs/modules/storage/storage.js';
import {
    type UserDto,
    type UserSignInRequestDto,
    type UserResponseDto,
    type UserSignUpRequestDto,
} from '~/libs/types/types.js';

import { AuthApiPath } from './libs/enums/enums.js';

type Constructor = {
    baseUrl: string;
    http: HTTP;
    storage: Storage;
};

class AuthApi extends BaseHTTPApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ baseUrl, http, path: APIPath.AUTH, storage });
    }
    public async getCurrentUser(): Promise<UserDto> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.CURRENT_USER, {}),
            {
                contentType: ContentType.JSON,
                hasAuth: true,
                method: HTTPRequestMethod.GET,
            },
        );

        return await response.json<UserDto>();
    }

    public async signIn(
        payload: UserSignInRequestDto,
    ): Promise<UserResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
            {
                contentType: ContentType.JSON,
                hasAuth: false,
                method: HTTPRequestMethod.POST,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<UserResponseDto>();
    }

    public async signUp(
        payload: UserSignUpRequestDto,
    ): Promise<UserResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
            {
                contentType: ContentType.JSON,
                hasAuth: false,
                method: HTTPRequestMethod.POST,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<UserResponseDto>();
    }
}

export { AuthApi };
