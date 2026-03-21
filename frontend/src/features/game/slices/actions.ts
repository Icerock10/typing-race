import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
    type RoomPayload,
    type RoomResponseDto,
    type GameDto,
    type AsyncThunkConfig,
} from '~/libs/types/types.js';
import { name as sliceName } from './game.slice.js';

const ActionType = {
    CREATE_ROOM: `${sliceName}/create-room`,
    JOIN_ROOM: `${sliceName}/join-room`,
    LEAVE_ROOM: `${sliceName}/leave-room`,
    REFRESH_ROOM: `${sliceName}/refresh-room`,
    SET_READY_STATUS: `${sliceName}/set-ready`,
    PLAYER_FINISH: `${sliceName}/player-finish`,
    SEND_CHAT_MESSAGE: `${sliceName}/send-chat-message`,
};

type ChatMessageSendPayload = {
    roomId: RoomResponseDto['roomId'];
    message: string;
};

type ReadyStatusPayload = {
    roomId: RoomResponseDto['roomId'];
    isReady: boolean;
};

const setReadyStatus = createAction<ReadyStatusPayload>(
    ActionType.SET_READY_STATUS,
);
const createRoom = createAction<RoomPayload>(ActionType.CREATE_ROOM);
const initChatMessageSend = createAction<ChatMessageSendPayload>(
    ActionType.SEND_CHAT_MESSAGE,
);
const joinRoom = createAction<{ roomId: string }>(ActionType.JOIN_ROOM);
const leaveRoom = createAction<{ roomId: string }>(ActionType.LEAVE_ROOM);
const refreshRoom = createAction(ActionType.REFRESH_ROOM);
const initPlayerFinish = createAction<{ roomId: string }>(
    ActionType.PLAYER_FINISH,
);

const getAllGames = createAsyncThunk<GameDto[], undefined, AsyncThunkConfig>(
    `${sliceName}/get-all`,
    async (_, { extra, rejectWithValue }) => {
        const { gameApi } = extra;
        try {
            const games = await gameApi.getAllGames();
            return games;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export {
    createRoom,
    joinRoom,
    leaveRoom,
    refreshRoom,
    setReadyStatus,
    initPlayerFinish,
    initChatMessageSend,
    getAllGames,
};
