import { type RoomResponseDto } from '../../features/rooms/rooms.js';

type AppStatsDto = {
    onlineUsers: number;
    activeRooms: RoomResponseDto[];
    wpm: number;
};

export { type AppStatsDto };
