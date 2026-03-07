import {
    type RoomResponseDto,
    type InternalRoom,
    type Player,
} from './types/types.js';
import { type UserDto, type AppStatsDto } from '~/libs/types/types.js';
import { HandlerParameterIndexes } from 'shared';

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
        const activeRooms = this.roomMap.size;
        return {
            onlineUsers,
            activeRooms,
            wpm: 130,
        };
    }
    removeUser(socketId: string): boolean {
        return this.userMap.delete(socketId);
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

    onJoinRoom(roomId: string, player: Player): RoomResponseDto | undefined {
        const room = this.roomMap.get(roomId);

        room?.players.set(String(player.user.id), player);
        return this.getRoom(roomId);
    }
    onLeaveRoom(roomId: string, playerId: string): RoomResponseDto | undefined {
        const room = this.roomMap.get(roomId);

        room?.players.delete(playerId);
        return this.getRoom(roomId);
    }

    mapPlayers(players: Map<string, Player>): UserDto[] {
        const updatedPlayers = players.values().map((player) => player.user);
        return [...updatedPlayers];
    }

    clear(): void {
        this.roomMap.clear();
        this.userMap.clear();
    }
}

export { GameStore };
