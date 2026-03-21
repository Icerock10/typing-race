import { type GameRepository } from './game.repository.js';
import { type GameDto } from './libs/types/types.js';
import { GameEntity } from './game.entity.js';

type Constructor = {
    gameRepository: GameRepository;
};

class GameService {
    private gameRepository: GameRepository;
    public constructor({ gameRepository }: Constructor) {
        this.gameRepository = gameRepository;
    }

    public async create({
        title,
        language,
        difficulty,
        winnerUserId,
        results,
    }: GameDto): Promise<GameDto> {
        const gameEntity = await this.gameRepository.create(
            GameEntity.initializeNew({
                title,
                language,
                difficulty,
                winnerUserId,
                results,
            }),
        );
        return gameEntity.toObject();
    }
    public async getAll(): Promise<GameDto[]> {
        const gameEntities = await this.gameRepository.getAll();
        const gameDtos = gameEntities.map((gameEntity) =>
            gameEntity.toObject(),
        );
        return gameDtos;
    }
}

export { GameService };
