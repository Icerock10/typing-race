import {
    type RoomResponseDto,
    type InternalRoom,
    type AppStatsDto,
    type Player,
} from '../libs/types/types.js';
import { GameStatus, HandlerParameterIndexes } from '~/libs/enums/enums.js';

import { sortPlayersByProgress } from '../libs/helpers/helpers.js';

type Store = {
    addUser: (socketId: string, userId: string | null) => void;
    getUser: (socketId: string) => string | undefined;
    getRoom: (roomId: string) => RoomResponseDto | undefined;
    addRoom: (roomId: string, roomData: InternalRoom) => void;
};

class GameStore implements Store {
    public userMap = new Map<string, string | null>();
    public roomMap = new Map<string, InternalRoom>();
    public gameTimers = new Map<string, ReturnType<typeof setTimeout>>();

    addUser(socketId: string, userId: string | null): void {
        this.userMap.set(socketId, userId);
    }

    getUser(socketId: string): ReturnType<Store['getUser']> {
        const user = this.userMap.get(socketId);
        return user ?? undefined;
    }
    getStats(): AppStatsDto {
        const onlineUsers = this.userMap.size;
        const activeRooms = this.getAllRooms();
        const MOCK_WPM_VALUE = 130;
        return {
            onlineUsers,
            activeRooms,
            wpm: MOCK_WPM_VALUE,
        };
    }
    removeUser(socketId: string): boolean {
        return this.userMap.delete(socketId);
    }

    setPlayerReadyStatus(
        roomId: string,
        userId: string,
        isReady: boolean,
    ): RoomResponseDto | undefined {
        const room = this.roomMap.get(roomId);
        const player = room?.players.get(userId);

        if (player) {
            player.isReady = isReady;
        }
        return this.getRoom(roomId);
    }

    addRoom(roomId: string, roomData: InternalRoom): RoomResponseDto {
        this.roomMap.set(roomId, roomData);
        return this.getRoom(roomId) as RoomResponseDto;
    }

    getRoom(roomId: string): ReturnType<Store['getRoom']> {
        const internalRoom = this.roomMap.get(roomId);
        if (!internalRoom) {
            return undefined;
        }

        return {
            ...internalRoom,
            players: this.rankPlayersForRoomResponse(
                internalRoom.players,
                internalRoom.status,
            ),
        };
    }

    getAllRooms(): RoomResponseDto[] {
        const rooms = [...this.roomMap.values()];
        const roomsWithUpdatedPlayers = rooms.map((room) => ({
            ...room,
            players: this.rankPlayersForRoomResponse(room.players, room.status),
        }));
        return roomsWithUpdatedPlayers.length >
            HandlerParameterIndexes.FIRST_PARAM_INDEX
            ? roomsWithUpdatedPlayers
            : [];
    }

    onJoinRoom(
        roomId: string,
        player: Player | null,
    ): RoomResponseDto | undefined {
        const room = this.roomMap.get(roomId);
        if (!room) {
            return undefined;
        }
        if (player) {
            room.players.set(String(player.user.id), player);
            this.updateRoomStatus(roomId);
        }

        return this.getRoom(roomId);
    }
    onLeaveRoom(
        roomId: string,
        playerId: string | null,
    ): RoomResponseDto | undefined {
        const room = this.roomMap.get(roomId);
        if (!room) {
            return undefined;
        }
        if (playerId) {
            room.players.delete(playerId);
            this.updateRoomStatus(roomId);
        }
        return this.getRoom(roomId);
    }

    updateRoomStatus(
        roomId: string,
        status?: RoomResponseDto['status'],
        startedAt?: number,
    ): void {
        const room = this.roomMap.get(roomId);
        if (!room) {
            return;
        }

        if (startedAt) {
            room.startedAt = startedAt;
        }
        if (status) {
            room.status = status;
            return;
        }
        if (
            room.status === GameStatus.IN_GAME ||
            room.status === GameStatus.FINISHED
        ) {
            return;
        }
        const isRoomFull = room.players.size === Number(room.maxPlayers);

        room.status = isRoomFull ? GameStatus.FULL : GameStatus.WAITING;
    }

    rankPlayersForRoomResponse(
        players: Map<string, Player>,
        roomStatus: string,
    ): RoomResponseDto['players'] {
        const INITIAL_STAT_VALUE = 0;
        const PLAYER_MAX_PROGRESS = 100;
        const INDEX_OFFSET = 1;
        const sortedPlayersByProgress = sortPlayersByProgress([
            ...players.values(),
        ]);

        const hasWinner = sortedPlayersByProgress.some(
            (player) => player.isWinner,
        );
        if (!hasWinner) {
            const [topPlayer] = sortedPlayersByProgress;
            if (
                topPlayer &&
                (topPlayer.progress === PLAYER_MAX_PROGRESS ||
                    roomStatus === GameStatus.FINISHED)
            ) {
                topPlayer.isWinner = true;
            }
        }

        return sortedPlayersByProgress.map(
            (
                {
                    user,
                    isReady = false,
                    wpm = INITIAL_STAT_VALUE,
                    accuracy = INITIAL_STAT_VALUE,
                    errors = INITIAL_STAT_VALUE,
                    progress = INITIAL_STAT_VALUE,
                    isTyping = false,
                    isWinner = false,
                    finishedAt,
                },
                index,
            ) => ({
                ...user,
                isReady,
                wpm,
                accuracy,
                errors,
                progress,
                isTyping,
                isWinner,
                playerRacePosition: index + INDEX_OFFSET,
                finishedAt,
            }),
        );
    }

    deleteRoom(roomId: string): void {
        this.roomMap.delete(roomId);
    }

    updatePlayerProgress({
        roomId,
        playerProgress,
        userId,
    }: {
        roomId: string;
        playerProgress: Player;
        userId: string;
    }): RoomResponseDto | undefined {
        const room = this.roomMap.get(roomId);
        const currentPlayer = room?.players.get(userId);
        if (currentPlayer) {
            room?.players.set(userId, { ...currentPlayer, ...playerProgress });
        }
        return this.getRoom(roomId);
    }

    setGameTimer(roomId: string, timer: ReturnType<typeof setTimeout>): void {
        this.gameTimers.set(roomId, timer);
    }
    cancelGameTimer(roomId: string): void {
        const timer = this.gameTimers.get(roomId);
        if (timer) {
            clearTimeout(timer);
            this.gameTimers.delete(roomId);
        }
    }
    attachPlayerFinishTime(
        roomId: string,
        socketId: string,
    ): ReturnType<Store['getRoom']> {
        const room = this.roomMap.get(roomId);
        const player = room?.players.get(socketId);
        if (!player) {
            return;
        }

        if (!player.finishedAt) {
            player.finishedAt = Date.now();
        }
        return this.getRoom(roomId);
    }
    findRoomByUserId(userId: string): RoomResponseDto | undefined {
        const rooms = this.getAllRooms();
        return rooms.find((room) =>
            room.players.some((player) => player.id === userId),
        );
    }
    clear(): void {
        this.roomMap.clear();
        this.userMap.clear();
    }
}

export { GameStore };
