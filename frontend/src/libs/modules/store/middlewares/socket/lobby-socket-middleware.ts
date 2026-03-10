import { type Middleware } from '@reduxjs/toolkit';
import { type RoomResponseDto, type AppStatsDto } from '~/libs/types/types.js';
import { LobbySocketEvent } from '~/libs/enums/enums.js';
import { actions as lobbyActions } from '~/features/game/slices/game.js';
import { socket } from './socket.js';
import { actions as authActions } from '~/features/auth/auth.js';

const lobbySocketMiddleware: Middleware = ({ dispatch }) => {
    socket.on(LobbySocketEvent.CREATE_ROOM, (roomData: RoomResponseDto) => {
        dispatch(lobbyActions.roomCreated(roomData));
    });
    socket.on(LobbySocketEvent.JOIN_ROOM, (roomData: RoomResponseDto) => {
        dispatch(lobbyActions.playerJoined(roomData));
    });
    socket.on(
        LobbySocketEvent.ROOM_DELETED,
        ({ roomId }: { roomId: string }) => {
            dispatch(lobbyActions.roomDeleted(roomId));
        },
    );
    socket.on(LobbySocketEvent.LEAVE_ROOM, (roomData: RoomResponseDto) => {
        dispatch(lobbyActions.playerLeft(roomData));
    });
    socket.on(LobbySocketEvent.REFRESH_ROOM, (rooms: RoomResponseDto[]) => {
        dispatch(lobbyActions.roomsUpdated(rooms));
    });

    socket.on(LobbySocketEvent.STATS_INFO, (stats: AppStatsDto) => {
        dispatch(lobbyActions.updatedStats(stats));
    });

    return (next) => (action) => {
        if (lobbyActions.createRoom.match(action)) {
            socket.emit(LobbySocketEvent.CREATE_ROOM, action.payload);
        }
        if (lobbyActions.joinRoom.match(action)) {
            socket.emit(LobbySocketEvent.JOIN_ROOM, action.payload);
        }
        if (lobbyActions.leaveRoom.match(action)) {
            socket.emit(LobbySocketEvent.LEAVE_ROOM, action.payload);
        }
        if (lobbyActions.refreshRoom.match(action)) {
            socket.emit(LobbySocketEvent.REFRESH_ROOM);
        }
        if (authActions.updateSocketAuth.match(action)) {
            socket.emit(LobbySocketEvent.AUTH_UPDATE, action.payload);
        }
        next(action);
    };
};

export { lobbySocketMiddleware };
