import {
    type RoomResponseDto,
    type ChatMessageDto,
    type AppStatsDto,
    type PlayerDto,
} from '../libs/types/types.js';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { updateRoomById } from '../libs/helpers/update-room-by-id.helper.js';

type PlayerProgress = Pick<
    PlayerDto,
    'wpm' | 'accuracy' | 'progress' | 'errors'
>;

type State = {
    rooms: RoomResponseDto[];
    stats: AppStatsDto | null;
    currentRoom: RoomResponseDto | null;
    isRoomsLoaded: boolean;
    race: {
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
            state.rooms = updateRoomById(state.rooms, action.payload);
        },
        playerLeft(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = updateRoomById(state.rooms, action.payload);
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
            state.rooms = updateRoomById(state.rooms, action.payload);
        },
        raceStarted(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = updateRoomById(state.rooms, action.payload);
        },
        raceFinished(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = updateRoomById(state.rooms, action.payload);
        },
        playerFinished(state, action: PayloadAction<RoomResponseDto>) {
            state.rooms = updateRoomById(state.rooms, action.payload);
        },
        toggleCountDown(state) {
            state.race.isCountDownStarted = !state.race.isCountDownStarted;
        },
        playerReconnected(
            state,
            action: PayloadAction<{
                room: RoomResponseDto;
                playerProgress: unknown;
            }>,
        ) {
            const { room, playerProgress } = action.payload;
            state.rooms = updateRoomById(state.rooms, room);
            state.race.playerTypingProgress = playerProgress as PlayerProgress;
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
