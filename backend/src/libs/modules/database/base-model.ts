import { modelOptions, type mongoose, prop } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
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
