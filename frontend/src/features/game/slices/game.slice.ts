import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RoomResponseDto, type AppStatsDto } from '~/libs/types/types.js';

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
    stats: AppStatsDto | null;
    currentRoom: RoomResponseDto | null;
    isRoomsLoaded: boolean;
    isRaceStarted: boolean;
    isCountDownStarted: boolean;
};

const initialState: State = {
    rooms: [],
    stats: null,
    currentRoom: null,
    isRoomsLoaded: false,
    isRaceStarted: false,
    isCountDownStarted: false,
};

const { actions, name, reducer } = createSlice({
    initialState,
    name: 'game',
    reducers: {
        roomCreated(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = [...state.rooms, action.payload];
            state.currentRoom = action.payload;
        },
        playerJoined(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = mapRooms(state.rooms, action.payload);
        },
        playerLeft(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = mapRooms(state.rooms, action.payload);
        },
        roomsUpdated(state, action: PayloadAction<RoomResponseDto[]>) {
            state.rooms = action.payload;
        },
        roomDeleted(state, action: PayloadAction<string>) {
            const updatedRooms = state.rooms.filter(
                (room) => room.roomId !== action.payload,
            );
            state.rooms = updatedRooms;

            if (state.stats) {
                state.stats.activeRooms = state.rooms;
            }
        },
        updatedStats(state, action: PayloadAction<AppStatsDto>) {
            state.stats = action.payload;
            state.rooms = action.payload.activeRooms;
            state.isRoomsLoaded = true;
        },
        resetCurrentRoom(state) {
            state.currentRoom = null;
        },
        updateCurrentRoom(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = mapRooms(state.rooms, action.payload);
        },
        raceStarted(state, action: PayloadAction<RoomResponseDto>) {
            state.isRaceStarted = true;
            state.rooms = mapRooms(state.rooms, action.payload);
        },
        toggleCountDown(state) {
            state.isCountDownStarted = !state.isCountDownStarted;
        },
    },
});

export { actions, name, reducer };
