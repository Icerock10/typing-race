import { type Middleware } from '@reduxjs/toolkit';
import { actions as gameActions } from '~/features/game/slices/game.js';
import {
    type RoomResponseDto,
    type ChatMessageDto,
} from '~/libs/types/types.js';
import { socket } from './socket.js';
import {
    RaceSocketEvent,
    GameStatus,
    RaceChatSocketEvent,
} from '~/libs/enums/enums.js';

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
    socket.on(RaceSocketEvent.UPDATE_PROGRESS, (room: RoomResponseDto) => {
        dispatch(gameActions.updateCurrentRoom(room));
    });
    socket.on(RaceSocketEvent.RACE_FINISHED, (room: RoomResponseDto) => {
        dispatch(gameActions.raceFinished(room));
    });
    socket.on(RaceSocketEvent.PLAYER_FINISHED, (room: RoomResponseDto) => {
        dispatch(gameActions.playerFinished(room));
    });
    socket.on(RaceChatSocketEvent.NEW_MESSAGE, (payload: ChatMessageDto) => {
        dispatch(gameActions.updatedChatMessages(payload));
    });
    socket.on(
        RaceSocketEvent.PLAYER_RECONNECTED,
        (payload: { room: RoomResponseDto; playerProgress: unknown }) => {
            dispatch(gameActions.playerReconnected(payload));
        },
    );
    return (next) => (action) => {
        if (gameActions.setReadyStatus.match(action)) {
            socket.emit(RaceSocketEvent.SET_READY_STATUS, action.payload);
        }
        if (gameActions.updatePlayerProgress.match(action)) {
            socket.emit(RaceSocketEvent.UPDATE_PROGRESS, action.payload);
        }
        if (gameActions.initPlayerFinish.match(action)) {
            socket.emit(RaceSocketEvent.PLAYER_FINISHED, action.payload);
        }
        if (gameActions.initChatMessageSend.match(action)) {
            socket.emit(RaceChatSocketEvent.SEND_MESSAGE, action.payload);
        }
        next(action);
    };
};

export { gameSocketMiddleware };
