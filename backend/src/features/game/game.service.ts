import { type GameRepository } from './game.repository.js';
import { type GameDto } from './libs/types/types.js';
import { GameEntity } from './game.entity.js';

type Constructor = {
    gameRepository: GameRepository;
};

type Service<T> = {
    create(payload: T): Promise<T>;
};

class GameService implements Service<GameDto> {
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
}

export { GameService };
