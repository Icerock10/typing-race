import { type Socket as TSocket } from 'socket.io';
import { GameStatus } from '~/libs/enums/enums.js';
import { type UserDto, type RoomResponseDto } from '~/libs/types/types.js';
import { type Player } from '../../libs/types/types.js';
import { type GameStore } from '../../store/base-game-store.module.js';

type SetReadyStatusReturnType = {
    shouldStart?: boolean;
    room?: RoomResponseDto;
    startedRoom?: RoomResponseDto;
};

type Constructor = {
    store: GameStore;
};

const MAX_PROGRESS_VALUE = 100;

class RaceService {
    private store;

    constructor({ store }: Constructor) {
        this.store = store;
    }

    public setReadyStatus = ({
        roomId,
        socket,
        isReady,
    }: {
        roomId: string;
        socket: TSocket;
        isReady: boolean;
    }): SetReadyStatusReturnType | undefined => {
        const { id } = this.getUserFromSocket(socket);
        const room = this.store.setPlayerReadyStatus(
            roomId,
            String(id),
            isReady,
        );

        if (room?.status !== GameStatus.FULL) {
            return { room, shouldStart: false };
        }

        const areAllPlayersReady = room.players.every(
            (player) => player.isReady,
        );

        if (!areAllPlayersReady) {
            return { room, shouldStart: false };
        }

        const startedAt = Date.now();
        this.store.updateRoomStatus(roomId, GameStatus.IN_GAME, startedAt);
        const startedRoom = this.store.getRoom(roomId);

        return { room, shouldStart: true, startedRoom };
    };

    public handlePlayerFinish = ({
        roomId,
        socket,
    }: {
        roomId: string;
        socket: TSocket;
    }): RoomResponseDto => {
        const { id } = this.getUserFromSocket(socket);
        const room = this.store.attachPlayerFinishTime(roomId, String(id));
        return room as RoomResponseDto;
    };

    public updatePlayerProgress = ({
        socket,
        roomId,
        playerProgress,
    }: {
        socket: TSocket;
        roomId: string;
        playerProgress: Player;
    }): {
        updatedRoomWithPlayerProgress: RoomResponseDto | undefined;
        haveAllFinished: boolean;
    } => {
        const { id } = this.getUserFromSocket(socket);
        const userId = String(id);
        const updatedRoomWithPlayerProgress = this.store.updatePlayerProgress({
            roomId,
            playerProgress,
            userId,
        });

        const haveAllFinished =
            updatedRoomWithPlayerProgress?.players.every(
                (player) => player.progress === MAX_PROGRESS_VALUE,
            ) ?? false;
        return { updatedRoomWithPlayerProgress, haveAllFinished };
    };

    public finishRace = (roomId: string): RoomResponseDto | undefined => {
        this.store.cancelGameTimer(roomId);
        this.store.updateRoomStatus(roomId, GameStatus.FINISHED);
        const room = this.store.getRoom(roomId);
        return room;
    };

    public setGameTimer = ({
        roomId,
        timer,
    }: {
        roomId: string;
        timer: ReturnType<typeof setTimeout>;
    }): void => {
        this.store.setGameTimer(roomId, timer);
    };

    public getUserFromSocket = (socket: TSocket): UserDto => {
        const { user } = socket.data as Record<'user', UserDto>;
        return user;
    };
}

export { RaceService };
