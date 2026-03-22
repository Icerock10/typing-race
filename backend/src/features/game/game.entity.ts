import { type GameDto, type GameResultDto } from '~/libs/types/types.js';

class GameEntity {
    private id: null | string;
    private title: string;
    private language: GameDto['language'];
    private difficulty: GameDto['difficulty'];
    private winnerUserId: string;
    private results: GameResultDto[];

    private constructor({
        title,
        id,
        language,
        difficulty,
        winnerUserId,
        results,
    }: GameDto) {
        this.id = id;
        this.title = title;
        this.language = language;
        this.difficulty = difficulty;
        this.winnerUserId = winnerUserId;
        this.results = results;
    }

    public static initialize({
        title,
        id,
        language,
        difficulty,
        winnerUserId,
        results,
    }: GameDto): GameEntity {
        return new GameEntity({
            title,
            id,
            language,
            difficulty,
            winnerUserId,
            results,
        });
    }

    public static initializeNew(properties: {
        title: string;
        language: GameDto['language'];
        difficulty: GameDto['difficulty'];
        winnerUserId: string;
        results: GameResultDto[];
    }): GameEntity {
        return new GameEntity({
            id: null,
            language: properties.language,
            difficulty: properties.difficulty,
            winnerUserId: properties.winnerUserId,
            results: properties.results,
            title: properties.title,
        });
    }

    public toObject(): GameDto {
        return {
            id: this.id,
            winnerUserId: this.winnerUserId,
            language: this.language,
            difficulty: this.difficulty,
            results: this.results,
            title: this.title,
        };
    }
}

export { GameEntity };
