import { getModelForClass, prop } from '@typegoose/typegoose';
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
    public language!: string;
    @prop({ type: () => String })
    public difficulty!: string;
    @prop({ type: () => String, default: null })
    public winnerUserId!: string | null;
    @prop({ type: () => [UserResult], _id: false })
    public result!: UserResult[];
}

const gameModel = getModelForClass(Game);

export { Game, gameModel };
