type DataBase = {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
};

export { type DataBase };
