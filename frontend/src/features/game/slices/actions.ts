import { createAction } from '@reduxjs/toolkit';
import { type RoomPayload, type RoomResponseDto } from '~/libs/types/types.js';
import { name as sliceName } from './game.slice.js';

const ActionType = {
    CREATE_ROOM: `${sliceName}/create-room`,
    JOIN_ROOM: `${sliceName}/join-room`,
    LEAVE_ROOM: `${sliceName}/leave-room`,
    REFRESH_ROOM: `${sliceName}/refresh-room`,
    SET_READY_STATUS: `${sliceName}/set-ready`,
    PLAYER_FINISH: `${sliceName}/player-finish`,
};

type ReadyStatusPayload = {
    roomId: RoomResponseDto['roomId'];
    isReady: boolean;
};

const setReadyStatus = createAction<ReadyStatusPayload>(
    ActionType.SET_READY_STATUS,
);
const createRoom = createAction<RoomPayload>(ActionType.CREATE_ROOM);
const joinRoom = createAction<{ roomId: string }>(ActionType.JOIN_ROOM);
const leaveRoom = createAction<{ roomId: string }>(ActionType.LEAVE_ROOM);
const refreshRoom = createAction(ActionType.REFRESH_ROOM);
const initPlayerFinish = createAction<{ roomId: string }>(
    ActionType.PLAYER_FINISH,
);

export {
    createRoom,
    joinRoom,
    leaveRoom,
    refreshRoom,
    setReadyStatus,
    initPlayerFinish,
};
