import { getModelForClass, prop } from '@typegoose/typegoose';
import { GameDto } from './libs/types/types.js';
import { BaseModel } from '~/libs/modules/database/base-model.js';

class UserResult {
    @prop({ type: String })
    public userId!: string;

    @prop({ type: String })
    public userName!: string;

    @prop({ type: Number })
    public wpm!: number;

    @prop({ type: Number })
    public accuracy!: number;

    @prop({ type: Number })
    public place!: number;

    @prop({ type: Number })
    public finishedAt!: number;
}

class Game extends BaseModel {
    @prop({ type: () => String })
    public title!: string;
    @prop({ type: () => String })
    public language!: GameDto['language'];
    @prop({ type: () => String })
    public difficulty!: GameDto['difficulty'];
    @prop({ type: () => String, default: null })
    public winnerUserId!: string;
    @prop({ type: () => [UserResult], _id: false })
    public results!: UserResult[];
}

const gameModel = getModelForClass(Game);

export { Game, gameModel };
