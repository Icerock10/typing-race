import { type RoomResponseDto } from '~/libs/types/types.js';

const validateJoinCode = (
    rooms: RoomResponseDto[],
    roomJoinCode: string,
): boolean => rooms.some((room) => room.roomId === roomJoinCode);

export { validateJoinCode };
