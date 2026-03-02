import { type RoomStateDto, type GameResultDto } from '~/libs/types/types.js';

type PlayerResult = GameResultDto & { roomId: string; token: string };

type Store = {
    addUser: (socketId: string, userData: Partial<PlayerResult>) => void;
    getUser: (socketId: string) => PlayerResult | undefined;
    addRoom: (roomId: string, roomData: RoomStateDto) => void;
    getRoom: (roomId: string) => RoomStateDto | undefined;
};

class GameStore implements Store {
    public userMap = new Map<string, PlayerResult>();
    public roomMap = new Map<string, RoomStateDto>();

    addUser(socketId: string, userData: Partial<PlayerResult>): void {
        const existing = this.userMap.get(socketId) || {};
        this.userMap.set(socketId, {
            ...existing,
            ...userData,
        } as PlayerResult);
    }

    getUser(socketId: string): ReturnType<Store['getUser']> {
        return this.userMap.get(socketId);
    }

    addRoom(roomId: string, roomData: RoomStateDto): void {
        this.roomMap.set(roomId, roomData);
    }

    getRoom(roomId: string): ReturnType<Store['getRoom']> {
        return this.roomMap.get(roomId);
    }

    addPlayerToRoom(socketId: string, room: RoomStateDto): void {
        room.players.add(socketId);
    }

    clear(): void {
        this.roomMap.clear();
        this.userMap.clear();
    }
}

export { GameStore };
