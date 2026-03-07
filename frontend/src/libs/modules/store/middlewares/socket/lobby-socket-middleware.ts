import { type Middleware } from '@reduxjs/toolkit';
import { type RoomResponseDto } from '~/libs/types/types.js';
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
    lobbySocket.connect();
};

void connectLobby();

const lobbySocketMiddleware: Middleware = ({ dispatch }) => {
    lobbySocket.on(
        SocketEvent.LOBBY_CREATE_ROOM,
        (roomData: RoomResponseDto) => {
            dispatch(lobbyActions.roomCreated(roomData));
        },
    );

    return (next) => (action) => {
        if (lobbyActions.createRoom.match(action)) {
            lobbySocket.emit(SocketEvent.LOBBY_CREATE_ROOM, action.payload);
        }
        next(action);
    };
};

export { lobbySocketMiddleware };
