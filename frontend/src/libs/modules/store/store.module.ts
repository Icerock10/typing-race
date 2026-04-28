import {
    configureStore,
    type ThunkMiddleware,
    type Tuple,
    type UnknownAction,
} from '@reduxjs/toolkit';
import { AppEnvironment } from '~/libs/enums/enums.js';
import { type Config } from '~/libs/modules/config/config.js';
import { type BaseStorage, storage } from '~/libs/modules/storage/storage.js';
import { authApi, reducer as authReducer } from '~/features/auth/auth.js';
import { reducer as gameReducer, gameApi } from '~/features/game/game.js';
import { reducer as userReducer, userApi } from '~/features/users/user.js';

import {
    listenerMiddleware,
    lobbySocketMiddleware,
    gameSocketMiddleware,
} from './middlewares/middlewares.js';

type ExtraArguments = {
    authApi: typeof authApi;
    gameApi: typeof gameApi;
    userApi: typeof userApi;
    storage: BaseStorage;
};

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    game: ReturnType<typeof gameReducer>;
    users: ReturnType<typeof userReducer>;
};

class Store {
    public instance: ReturnType<
        typeof configureStore<
            RootReducer,
            UnknownAction,
            Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
        >
    >;

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            storage,
            gameApi,
            userApi,
        };
    }

    public constructor(config: Config) {
        this.instance = configureStore({
            devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
            middleware: (getDefaultMiddleware) => {
                return getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                }).prepend(
                    listenerMiddleware.middleware,
                    lobbySocketMiddleware,
                    gameSocketMiddleware,
                );
            },
            reducer: {
                auth: authReducer,
                game: gameReducer,
                users: userReducer,
            },
        });
    }
}

export { Store };
