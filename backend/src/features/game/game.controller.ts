import { BaseController } from '~/libs/modules/controller/base-controller.module.js';
import { type APIHandlerResponse } from '~/libs/modules/controller/controller.js';
import { type Logger } from '~/libs/modules/logger/libs/types/types.js';
import { type GameService } from './game.service.js';
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
            handler: () => this.getAll(),
            method: HTTPRequestMethod.GET,
            path: GamesApiPath.ROOT,
            validation: {},
            isPublic: true,
        });
    }
    private async getAll(): Promise<APIHandlerResponse> {
        return {
            payload: await this.gameService.getAll(),
            status: HTTPCode.OK,
        };
    }
}

export { GameController };
