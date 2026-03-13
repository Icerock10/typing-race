import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    type RoomResponseDto,
    type AppStatsDto,
    type ChatMessageDto,
} from '~/libs/types/types.js';

const mapRooms = (
    rooms: RoomResponseDto[],
    roomPayload: RoomResponseDto,
): RoomResponseDto[] => {
    return rooms.map((room) =>
        room.roomId === roomPayload.roomId ? roomPayload : room,
    );
};

type PlayerProgress = {
    wpm: number;
    accuracy: number;
    progress: number;
    errors: number;
};

type State = {
    rooms: RoomResponseDto[];
    stats: AppStatsDto | null;
    currentRoom: RoomResponseDto | null;
    isRoomsLoaded: boolean;
    race: {
        isRaceStarted: boolean;
        isCountDownStarted: boolean;
        playerTypingProgress: PlayerProgress;
        chat: ChatMessageDto[];
    };
};

const initialState: State = {
    rooms: [],
    stats: null,
    currentRoom: null,
    isRoomsLoaded: false,
    race: {
        isRaceStarted: false,
        isCountDownStarted: false,
        playerTypingProgress: {
            wpm: 0,
            accuracy: 0,
            progress: 0,
            errors: 0,
        },
        chat: [],
    },
};

const { actions, name, reducer } = createSlice({
    initialState,
    name: 'game',
    reducers: {
        roomCreated(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = [...state.rooms, action.payload];
            state.currentRoom = action.payload;
            if (state.stats) {
                state.stats.activeRooms = state.rooms;
            }
        },
        playerJoined(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = mapRooms(state.rooms, action.payload);
        },
        playerLeft(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = mapRooms(state.rooms, action.payload);
            state.race.isRaceStarted = false;
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
            state.race.isRaceStarted = true;
            state.rooms = mapRooms(state.rooms, action.payload);
        },
        raceFinished(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = mapRooms(state.rooms, action.payload);
        },
        playerFinished(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = mapRooms(state.rooms, action.payload);
        },
        toggleCountDown(state) {
            state.race.isCountDownStarted = !state.race.isCountDownStarted;
        },
        updatePlayerProgress(
            state,
            action: PayloadAction<{
                playerProgress: PlayerProgress;
                roomId: string;
            }>,
        ) {
            const { playerProgress } = action.payload;
            state.race.playerTypingProgress = playerProgress;
        },
        updatedChatMessages(state, action: PayloadAction<ChatMessageDto>) {
            state.race.chat.push(action.payload);
        },
    },
});

export { actions, name, reducer };
