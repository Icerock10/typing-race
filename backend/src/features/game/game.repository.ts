import { BaseRepository } from '~/libs/modules/database/database.js';
import { type ReturnModelType } from '@typegoose/typegoose';
import { type Game as GameModel } from './game.model.js';
import { type Repository } from '~/libs/types/repository.type.js';
import { GameEntity } from './game.entity.js';

class GameRepository
    extends BaseRepository<typeof GameModel>
    implements Pick<Repository<GameEntity>, 'create'>
{
    public constructor(gameModel: ReturnModelType<typeof GameModel>) {
        super(gameModel);
    }

    public async create(entity: GameEntity): Promise<GameEntity> {
        const gameDocument = await super.createDocument(entity);
        return GameEntity.initialize(gameDocument);
    }
    public async getAll(): Promise<GameEntity[]> {
        const gameDocuments = await super.getAllDocuments();
        const toGameEntities = gameDocuments.map((document) =>
            GameEntity.initialize(document),
        );
        return toGameEntities;
    }
}

export { GameRepository };
