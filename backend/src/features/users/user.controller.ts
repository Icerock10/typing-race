import { BaseController } from '~/libs/modules/controller/base-controller.module.js';
import {
    type APIHandlerOptions,
    type APIHandlerResponse,
} from '~/libs/modules/controller/controller.js';
import { type Logger } from '~/libs/modules/logger/libs/types/types.js';

import {
    APIPath,
    HTTPCode,
    HTTPRequestMethod,
    UsersApiPath,
} from './libs/enums/enums.js';
import { type UserService } from './user.service.js';

class UserController extends BaseController {
    private userService: UserService;

    public constructor(logger: Logger, userService: UserService) {
        super(logger, APIPath.USERS);

        this.userService = userService;

        this.addRoute({
            handler: (options) =>
                this.findById(
                    options as APIHandlerOptions<{
                        params?: { id: string };
                    }>,
                ),
            method: HTTPRequestMethod.GET,
            path: UsersApiPath.USER,
        });
    }
    private async findById(
        options: APIHandlerOptions<{ params?: { id: string } }>,
    ): Promise<APIHandlerResponse> {
        return {
            payload: await this.userService.find(options.params?.id),
            status: HTTPCode.OK,
        };
    }
}

export { UserController };
