import { createAction } from '@reduxjs/toolkit';
import { type RoomPayload } from '~/libs/types/types.js';
import { name as sliceName } from './lobby.slice.js';

const ActionType = {
    CREATE_ROOM: `${sliceName}/create-room`,
};

const createRoom = createAction<RoomPayload>(ActionType.CREATE_ROOM);

export { createRoom };
