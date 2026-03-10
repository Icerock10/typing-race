import { type Middleware } from '@reduxjs/toolkit';

const gameSocketMiddleware: Middleware = () => {
    return (next) => (action) => {
        next(action);
    };
};

export { gameSocketMiddleware };
