import { type Middleware } from '@reduxjs/toolkit';
import { actions as raceActions } from '~/features/race/actions.js';
import { socket } from './socket.js';
import { RaceSocketEvent } from '~/libs/enums/enums.js';

const gameSocketMiddleware: Middleware = () => {
    return (next) => (action) => {
        if (raceActions.setReadyStatus.match(action)) {
            socket.emit(RaceSocketEvent.SET_READY_STATUS, action.payload);
        }

        next(action);
    };
};

export { gameSocketMiddleware };
