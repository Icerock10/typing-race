import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RoomPayload } from 'shared';

type State = {
    rooms: RoomPayload[];
};

const initialState: State = {
    rooms: [],
};

const { actions, name, reducer } = createSlice({
    initialState,
    name: 'lobby',
    reducers: {
        roomCreated(state, action: PayloadAction<RoomPayload>) {
            state.rooms = [...state.rooms, action.payload];
        },
    },
});

export { actions, name, reducer };
