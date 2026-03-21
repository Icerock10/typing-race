type Repository<T> = {
    create(payload: T): Promise<T>;
    find(id?: string): Promise<null | T>;
};

export { type Repository };
