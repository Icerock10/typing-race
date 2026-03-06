import { createAction } from '@reduxjs/toolkit';
import { SocketEvent } from '~/libs/enums/enums.js';
import { type RoomPayload } from '~/libs/types/types.js';

const createRoom = createAction<RoomPayload>(SocketEvent.LOBBY_CREATE_ROOM);

export { createRoom };
