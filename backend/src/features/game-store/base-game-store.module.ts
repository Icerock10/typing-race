import { type RoomResponseDto, type InternalRoom } from './types/types.js';

type Store = {
    addUser: (socketId: string, userId: string) => void;
    getUser: (socketId: string) => string | undefined;
    getRoom: (roomId: string) => RoomResponseDto | undefined;
    addRoom: (roomId: string, roomData: InternalRoom) => void;
};

class GameStore implements Store {
    public userMap = new Map<string, string>();
    public roomMap = new Map<string, InternalRoom>();

    addUser(socketId: string, userId: string): void {
        this.userMap.set(socketId, userId);
    }

    getUser(socketId: string): ReturnType<Store['getUser']> {
        return this.userMap.get(socketId);
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
        const players = internalRoom.players
            .values()
            .map((player) => player.user);

        return {
            ...internalRoom,
            players: [...players],
        };
    }

    clear(): void {
        this.roomMap.clear();
        this.userMap.clear();
    }
}

export { GameStore };
