import { type Middleware } from '@reduxjs/toolkit';
import { actions as gameActions } from '~/features/game/slices/game.js';
import { type RoomResponseDto } from '~/libs/types/types.js';
import { socket } from './socket.js';
import { RaceSocketEvent, GameStatus } from '~/libs/enums/enums.js';

const gameSocketMiddleware: Middleware = ({ dispatch }) => {
    socket.on(RaceSocketEvent.SET_READY_STATUS, (room: RoomResponseDto) => {
        dispatch(gameActions.updateCurrentRoom(room));
        const allReady = room.players.every((player) => player.isReady);
        if (allReady && room.status === GameStatus.FULL) {
            dispatch(gameActions.toggleCountDown());
        }
    });
    socket.on(RaceSocketEvent.RACE_STARTED, (room: RoomResponseDto) => {
        dispatch(gameActions.toggleCountDown());
        dispatch(gameActions.raceStarted(room));
    });
    return (next) => (action) => {
        if (gameActions.setReadyStatus.match(action)) {
            socket.emit(RaceSocketEvent.SET_READY_STATUS, action.payload);
        }
        next(action);
    };
};

export { gameSocketMiddleware };
