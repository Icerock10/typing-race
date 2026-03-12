import { type Server as SocketServer, type Socket as TSocket } from 'socket.io';
import {
    RaceSocketEvent,
    SocketNamespace,
} from '~/libs/modules/socket/libs/enums/enums.js';
import { GameStatus } from '~/libs/enums/enums.js';
import { type GameStore } from '../store/base-game-store.module.js';

import { type Player, type UserDto } from '../store/types/types.js';

type Constructor = {
    socket: TSocket;
    io: SocketServer;
    store: GameStore;
};

const DELAY = 5000;

class RaceHandler {
    private socket;
    private io;
    private store;

    constructor({ socket, io, store }: Constructor) {
        this.socket = socket;
        this.io = io;
        this.store = store;
        this.registerEvents();
    }

    private registerEvents(): void {
        this.socket.on(RaceSocketEvent.SET_READY_STATUS, this.setReadyStatus);
        this.socket.on(
            RaceSocketEvent.UPDATE_PROGRESS,
            this.updatePlayerProgress,
        );
    }

    private setReadyStatus = ({
        roomId,
        isReady,
    }: {
        roomId: string;
        isReady: boolean;
    }): void => {
        const { user } = this.socket.data as Record<'user', UserDto>;
        const roomWithUpdatedPlayerStatus = this.store.setPlayerReadyStatus(
            roomId,
            String(user.id),
            isReady,
        );
        this.io
            .of(SocketNamespace.GAME)
            .to(roomId)
            .emit(
                RaceSocketEvent.SET_READY_STATUS,
                roomWithUpdatedPlayerStatus,
            );

        if (roomWithUpdatedPlayerStatus?.status === GameStatus.FULL) {
            const areAllPlayersReady =
                roomWithUpdatedPlayerStatus.players.every(
                    (player) => player.isReady,
                );
            if (areAllPlayersReady) {
                roomWithUpdatedPlayerStatus.status = GameStatus.IN_GAME;
                setTimeout(() => {
                    this.io
                        .of(SocketNamespace.GAME)
                        .to(roomId)
                        .emit(
                            RaceSocketEvent.RACE_STARTED,
                            roomWithUpdatedPlayerStatus,
                        );
                    this.startRace(roomId);
                }, DELAY);
            }
        }
    };

    private startRace = (roomId: string): void => {
        const RACE_DURATION = 50_000;
        const room = this.store.getRoom(roomId);
        if (!room) {
            return;
        }
        const timer = setTimeout(() => {
            this.finishRace(roomId);
        }, RACE_DURATION);

        this.store.setGameTimer(roomId, timer);
    };

    private finishRace = (roomId: string): void => {
        this.store.cancelGameTimer(roomId);
        const room = this.store.getRoom(roomId);
        if (room) {
            room.status = GameStatus.FINISHED;
            this.io
                .of(SocketNamespace.GAME)
                .to(roomId)
                .emit(RaceSocketEvent.RACE_FINISHED, room);
        }
    };

    private updatePlayerProgress = ({
        playerProgress,
        roomId,
    }: {
        playerProgress: Player;
        roomId: string;
    }): void => {
        const { user } = this.socket.data as Record<string, UserDto>;
        const userId = String(user?.id);
        const updatedRoomWithPlayerProgress = this.store.updatePlayerProgress({
            roomId,
            playerProgress,
            userId,
        });
        const MAX_PROGRESS_VALUE = 100;

        const haveAllFinished = updatedRoomWithPlayerProgress?.players.every(
            (player) => player.progress === MAX_PROGRESS_VALUE,
        );
        if (haveAllFinished) {
            this.finishRace(roomId);
            return;
        }
        this.io
            .of(SocketNamespace.GAME)
            .to(roomId)
            .emit(
                RaceSocketEvent.UPDATE_PROGRESS,
                updatedRoomWithPlayerProgress,
            );
    };
}

export { RaceHandler };
