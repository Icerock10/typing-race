import {
    type RoomResponseDto,
    type InternalRoom,
    type Player,
} from './types/types.js';
import { GameStatus, HandlerParameterIndexes } from '~/libs/enums/enums.js';
import { type AppStatsDto } from '~/libs/types/types.js';

type Store = {
    addUser: (socketId: string, userId: string | null) => void;
    getUser: (socketId: string) => string | undefined;
    getRoom: (roomId: string) => RoomResponseDto | undefined;
    addRoom: (roomId: string, roomData: InternalRoom) => void;
};

class GameStore implements Store {
    public userMap = new Map<string, string | null>();
    public roomMap = new Map<string, InternalRoom>();

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
            players: this.mapPlayers(internalRoom.players),
        };
    }

    getAllRooms(): RoomResponseDto[] {
        const rooms = [...this.roomMap.values()];
        const roomsWithUpdatedPlayers = rooms.map((room) => ({
            ...room,
            players: this.mapPlayers(room.players),
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
            this.updateRoomStatus(room);
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
            this.updateRoomStatus(room);
        }
        return this.getRoom(roomId);
    }

    updateRoomStatus(room: InternalRoom | undefined): void {
        if (!room) {
            return;
        }

        room.status =
            Number(room.maxPlayers) === room.players.size
                ? GameStatus.FULL
                : GameStatus.WAITING;
    }

    mapPlayers(players: Map<string, Player>): RoomResponseDto['players'] {
        const INITIAL_STAT_VALUE = 0;
        return [...players.values()].map(
            ({
                user,
                isReady = false,
                wpm = INITIAL_STAT_VALUE,
                accuracy = INITIAL_STAT_VALUE,
                errors = INITIAL_STAT_VALUE,
                progress = INITIAL_STAT_VALUE,
            }) => ({
                ...user,
                isReady,
                wpm,
                accuracy,
                errors,
                progress,
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

    clear(): void {
        this.roomMap.clear();
        this.userMap.clear();
    }
}

export { GameStore };
