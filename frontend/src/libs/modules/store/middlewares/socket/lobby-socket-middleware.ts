import { type Middleware } from '@reduxjs/toolkit';
import { type RoomResponseDto, type AppStatsDto } from '~/libs/types/types.js';
import { SocketEvent, SocketNamespace } from '~/libs/enums/enums.js';
import { storage, StorageKey } from '~/libs/modules/storage/storage.js';
import { socketManager } from '~/libs/modules/socket/socket-manager.js';
import { actions as lobbyActions } from '~/features/lobby/slices/lobby.js';
import { config } from '~/libs/modules/config/config.js';

const lobbySocket = socketManager.getSocket(
    `${config.ENV.API.DEV_URL}${SocketNamespace.LOBBY}`,
);

const connectLobby = async (): Promise<void> => {
    const token = await storage.get(StorageKey.TOKEN);

    lobbySocket.auth = { token };
    if (!lobbySocket.connected) {
        lobbySocket.connect();
    }
};

void connectLobby();

const lobbySocketMiddleware: Middleware = ({ dispatch }) => {
    lobbySocket.on(
        SocketEvent.LOBBY_CREATE_ROOM,
        (roomData: RoomResponseDto) => {
            dispatch(lobbyActions.roomCreated(roomData));
        },
    );
    lobbySocket.on(SocketEvent.LOBBY_JOIN_ROOM, (roomData: RoomResponseDto) => {
        dispatch(lobbyActions.playerJoined(roomData));
    });
    lobbySocket.on(
        SocketEvent.LOBBY_ROOM_DELETED,
        ({ roomId }: { roomId: string }) => {
            dispatch(lobbyActions.roomDeleted(roomId));
        },
    );
    lobbySocket.on(
        SocketEvent.LOBBY_LEAVE_ROOM,
        (roomData: RoomResponseDto) => {
            dispatch(lobbyActions.playerLeft(roomData));
        },
    );
    lobbySocket.on(
        SocketEvent.LOBBY_REFRESH_ROOM,
        (rooms: RoomResponseDto[]) => {
            dispatch(lobbyActions.roomsUpdated(rooms));
        },
    );

    lobbySocket.on(SocketEvent.LOBBY_STATS_INFO, (stats: AppStatsDto) => {
        dispatch(lobbyActions.updatedStats(stats));
    });

    return (next) => (action) => {
        if (lobbyActions.createRoom.match(action)) {
            lobbySocket.emit(SocketEvent.LOBBY_CREATE_ROOM, action.payload);
        }
        if (lobbyActions.joinRoom.match(action)) {
            lobbySocket.emit(SocketEvent.LOBBY_JOIN_ROOM, action.payload);
        }
        if (lobbyActions.leaveRoom.match(action)) {
            lobbySocket.emit(SocketEvent.LOBBY_LEAVE_ROOM, action.payload);
        }
        if (lobbyActions.refreshRoom.match(action)) {
            lobbySocket.emit(SocketEvent.LOBBY_REFRESH_ROOM);
        }
        next(action);
    };
};

export { lobbySocketMiddleware };
