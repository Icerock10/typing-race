import { type RoomResponseDto } from '../types/types.js';

const updateRoomById = (
    rooms: RoomResponseDto[],
    roomPayload: RoomResponseDto,
): RoomResponseDto[] => {
    return rooms.map((room) =>
        room.roomId === roomPayload.roomId ? roomPayload : room,
    );
};

export { updateRoomById };
