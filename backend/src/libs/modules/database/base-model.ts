import { modelOptions, type mongoose, prop } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_, returnValue: Record<string, unknown>) => {
                delete returnValue['__v'];
                delete returnValue['_id'];
                return returnValue;
            },
        },
    },
})
class BaseModel {
    public _id!: mongoose.Types.ObjectId;
    @prop({ type: () => Date }) public createdAt?: Date;
    @prop({ type: () => Date }) public updatedAt?: Date;
    public get id(): string {
        return this._id.toHexString();
    }
}

export { BaseModel };
