import {
    configureStore,
    type ThunkMiddleware,
    type Tuple,
    type UnknownAction,
} from '@reduxjs/toolkit';
import { lobbySocketMiddleware } from './lobby-middleware/lobby-socket-middleware.js';
import { AppEnvironment } from '~/libs/enums/enums.js';
import { type Config } from '~/libs/modules/config/config.js';
import { type BaseStorage, storage } from '~/libs/modules/storage/storage.js';
import { authApi, reducer as authReducer } from '~/features/auth/auth.js';
import { reducer as lobbyReducer } from '~/features/lobby/slices/lobby.js';

import { listenerMiddleware } from './listener-middleware/listener-middleware.js';

type ExtraArguments = {
    authApi: typeof authApi;
    storage: BaseStorage;
};

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    lobby: ReturnType<typeof lobbyReducer>;
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
                })
                    .prepend(listenerMiddleware.middleware)
                    .prepend(lobbySocketMiddleware);
            },
            reducer: {
                auth: authReducer,
                lobby: lobbyReducer,
            },
        });
    }
}

export { Store };
