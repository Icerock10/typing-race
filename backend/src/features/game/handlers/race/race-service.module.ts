import { GameStatus } from '~/libs/enums/enums.js';
import { type RoomResponseDto } from '~/libs/types/types.js';
import { type Player, type GameDto } from '../../libs/types/types.js';
import { type GameStore } from '../../store/base-game-store.module.js';
import { type GameService } from '../../game.service.js';

type SetReadyStatusReturnType = {
    shouldStart: boolean;
    room: RoomResponseDto;
    startedRoom?: RoomResponseDto;
};

type Constructor = {
    store: GameStore;
    gameService: GameService;
};

const MAX_PROGRESS_VALUE = 100;

class RaceService {
    private store;
    private gameService;

    constructor({ store, gameService }: Constructor) {
        this.store = store;
        this.gameService = gameService;
    }

    public setReadyStatus = ({
        roomId,
        userId,
        isReady,
    }: {
        roomId: string;
        isReady: boolean;
        userId: string;
    }): SetReadyStatusReturnType | undefined => {
        const room = this.store.setPlayerReadyStatus(roomId, userId, isReady);

        if (room?.status !== GameStatus.FULL) {
            return { room: room as RoomResponseDto, shouldStart: false };
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
        userId,
    }: {
        roomId: string;
        userId: string;
    }): RoomResponseDto => {
        const room = this.store.attachPlayerFinishTime(roomId, userId);
        return room as RoomResponseDto;
    };

    public updatePlayerProgress = ({
        userId,
        roomId,
        playerProgress,
    }: {
        userId: string;
        roomId: string;
        playerProgress: Player;
    }): {
        updatedRoomWithPlayerProgress: RoomResponseDto | undefined;
        haveAllFinished: boolean;
    } => {
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
        if (room) {
            void this.recordGameResults(room);
        }
        return room;
    };

    public recordGameResults = async (room: RoomResponseDto): Promise<void> => {
        const playerWinnerId = room.players.find((player) => player.isWinner);
        const getPlayerGameResults = room.players.map((player) => ({
            ...player,
            userId: player.id,
            userName: player.userName,
            wpm: player.wpm,
            accuracy: player.accuracy,
            place: player.playerRacePosition,
            finishedAt: player.finishedAt,
        })) as GameDto['results'];

        await this.gameService.create({
            title: room.roomName,
            language: room.language,
            difficulty: room.difficulty,
            winnerUserId: playerWinnerId?.id as string,
            results: getPlayerGameResults,
            id: null,
        });
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
}

export { RaceService };
