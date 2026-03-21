import { type ReturnModelType, type DocumentType } from '@typegoose/typegoose';

import { type BaseModel } from './base-model.js';

class BaseRepository<
    TModel extends typeof BaseModel,
    T = DocumentType<InstanceType<TModel>>,
> {
    constructor(public model: ReturnModelType<TModel>) {}

    public createDocument(payload: unknown): Promise<T> {
        return this.model.create(payload) as Promise<T>;
    }

    public findDocumentById(id?: string): Promise<T | null> {
        return this.model.findById(id);
    }

    public getAllDocuments(): Promise<T[]> {
        return this.model.find({});
    }
}

export { BaseRepository };
