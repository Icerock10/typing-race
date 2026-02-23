import { getModelForClass, prop } from '@typegoose/typegoose';

import { BaseModel } from '~/libs/modules/database/base-model.js';

class User extends BaseModel {
    @prop({ type: () => String })
    public email!: string;

    @prop({ type: () => String })
    public name!: string;

    @prop({ type: () => String })
    public passwordHash!: string;
}

const userModel = getModelForClass(User);

export { User, userModel };
