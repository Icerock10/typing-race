import { BaseController } from '~/libs/modules/controller/base-controller.module.js';
import {
    type APIHandlerOptions,
    type APIHandlerResponse,
} from '~/libs/modules/controller/controller.js';
import { type Logger } from '~/libs/modules/logger/libs/types/types.js';
import { type GameService } from './game.service.js';
import { type GameDto } from './libs/types/types.js';
import {
    APIPath,
    HTTPRequestMethod,
    HTTPCode,
    GamesApiPath,
} from './libs/enums/enums.js';

type Constructor = {
    logger: Logger;
    gameService: GameService;
};

class GameController extends BaseController {
    private gameService: GameService;
    public constructor({ logger, gameService }: Constructor) {
        super(logger, APIPath.GAMES);
        this.gameService = gameService;
        this.addRoute({
            handler: (options) =>
                this.create(
                    options as APIHandlerOptions<{
                        body: GameDto;
                    }>,
                ),
            method: HTTPRequestMethod.POST,
            path: GamesApiPath.CREATE,
            validation: {},
            isPublic: true,
        });
    }
    private async create(
        options: APIHandlerOptions<{ body: GameDto }>,
    ): Promise<APIHandlerResponse> {
        return {
            payload: await this.gameService.create(options.body),
            status: HTTPCode.OK,
        };
    }
}

export { GameController };
