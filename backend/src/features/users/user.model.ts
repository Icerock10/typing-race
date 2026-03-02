import { getModelForClass, prop } from '@typegoose/typegoose';

import { BaseModel } from '~/libs/modules/database/base-model.js';

class User extends BaseModel {
    @prop({ type: () => String })
    public email!: string;

    @prop({ type: () => String })
    public firstName!: string;

    @prop({ type: () => String })
    public lastName!: string;

    @prop({ type: () => String })
    public userName!: string;

    @prop({ type: () => String })
    public avatarUrl!: string;

    @prop({ type: () => String })
    public passwordHash!: string;
}

const userModel = getModelForClass(User);

export { User, userModel };
