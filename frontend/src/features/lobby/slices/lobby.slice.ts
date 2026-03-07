import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RoomResponseDto } from '~/libs/types/types.js';

type State = {
    rooms: RoomResponseDto[];
};

const initialState: State = {
    rooms: [],
};

const { actions, name, reducer } = createSlice({
    initialState,
    name: 'lobby',
    reducers: {
        roomCreated(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = [...state.rooms, action.payload];
        },
        playerJoined(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = state.rooms.map((room) =>
                room.roomId === action.payload.roomId ? action.payload : room,
            );
        },
    },
});

export { actions, name, reducer };
