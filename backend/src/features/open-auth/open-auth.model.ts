import { getModelForClass, prop } from '@typegoose/typegoose';

import { BaseModel } from '~/libs/modules/database/base-model.js';

class OpenAuth extends BaseModel {
    @prop({ type: () => String })
    public userId!: string;

    @prop({ type: () => String })
    public provider!: string;

    @prop({ type: () => String })
    public providerUserId!: string;
}

const openAuthModel = getModelForClass(OpenAuth);

export { OpenAuth, openAuthModel };
