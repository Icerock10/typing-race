import { createAction } from '@reduxjs/toolkit';
import { type RoomPayload } from '~/libs/types/types.js';
import { name as sliceName } from './lobby.slice.js';

const ActionType = {
    CREATE_ROOM: `${sliceName}/create-room`,
    JOIN_ROOM: `${sliceName}/join-room`,
    LEAVE_ROOM: `${sliceName}/leave-room`,
    REFRESH_ROOM: `${sliceName}/refresh-room`,
};

const createRoom = createAction<RoomPayload>(ActionType.CREATE_ROOM);
const joinRoom = createAction<{ roomId: string }>(ActionType.JOIN_ROOM);
const leaveRoom = createAction<{ roomId: string }>(ActionType.LEAVE_ROOM);
const refreshRoom = createAction(ActionType.REFRESH_ROOM);

export { createRoom, joinRoom, leaveRoom, refreshRoom };
