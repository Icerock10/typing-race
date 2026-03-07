import { createAction } from '@reduxjs/toolkit';
import { type RoomPayload } from '~/libs/types/types.js';
import { name as sliceName } from './lobby.slice.js';

const ActionType = {
    CREATE_ROOM: `${sliceName}/create-room`,
    JOIN_ROOM: `${sliceName}/join-room`,
};

const createRoom = createAction<RoomPayload>(ActionType.CREATE_ROOM);
const joinRoom = createAction<{ roomId: string }>(ActionType.JOIN_ROOM);

export { createRoom, joinRoom };
