import { BaseController } from '~/libs/modules/controller/base-controller.module.js';
import {
    type APIHandlerOptions,
    type APIHandlerResponse,
} from '~/libs/modules/controller/controller.js';
import { type Logger } from '~/libs/modules/logger/libs/types/logger.type.js';
import {
    APIPath,
    HTTPCode,
    HTTPRequestMethod,
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from '~/features/users/libs/enums/enums.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/features/users/libs/types/types.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './libs/enums/enums.js';

class AuthController extends BaseController {
    private authService: AuthService;
    public constructor(logger: Logger, authService: AuthService) {
        super(logger, APIPath.AUTH);
        this.authService = authService;

        this.addRoute({
            handler: (options) =>
                this.signIn(
                    options as APIHandlerOptions<{
                        body: UserSignInRequestDto;
                        query?: { planId: string };
                    }>,
                ),
            isPublic: true,
            method: HTTPRequestMethod.POST,
            path: AuthApiPath.SIGN_IN,
            validation: {
                body: userSignInValidationSchema,
            },
        });
        this.addRoute({
            handler: (options) => this.getAuthenticatedUser(options),
            method: HTTPRequestMethod.GET,
            path: AuthApiPath.CURRENT_USER,
        });
        this.addRoute({
            handler: (options) =>
                this.signUp(
                    options as APIHandlerOptions<{
                        body: UserSignUpRequestDto;
                    }>,
                ),
            isPublic: true,
            method: HTTPRequestMethod.POST,
            path: AuthApiPath.SIGN_UP,
            validation: {
                body: userSignUpValidationSchema,
            },
        });
    }

    private getAuthenticatedUser(
        options: APIHandlerOptions,
    ): APIHandlerResponse {
        return {
            payload: options.user,
            status: HTTPCode.OK,
        };
    }

    private async signIn(
        options: APIHandlerOptions<{ body: UserSignInRequestDto }>,
    ): Promise<APIHandlerResponse> {
        return {
            payload: await this.authService.signIn({
                userRequestDto: options.body,
            }),
            status: HTTPCode.OK,
        };
    }

    private async signUp(
        options: APIHandlerOptions<{ body: UserSignUpRequestDto }>,
    ): Promise<APIHandlerResponse> {
        const signedUpUser = await this.authService.signUp({
            userRequestDto: options.body,
        });

        return {
            payload: signedUpUser,
            status: HTTPCode.OK,
        };
    }
}

export { AuthController };
