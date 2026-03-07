import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RoomResponseDto } from '~/libs/types/types.js';

const mapRooms = (
    rooms: RoomResponseDto[],
    roomPayload: RoomResponseDto,
): RoomResponseDto[] => {
    return rooms.map((room) =>
        room.roomId === roomPayload.roomId ? roomPayload : room,
    );
};

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
            state.rooms = mapRooms(state.rooms, action.payload);
        },
        playerLeft(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = mapRooms(state.rooms, action.payload);
        },
    },
});

export { actions, name, reducer };
