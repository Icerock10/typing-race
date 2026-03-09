import { z } from 'zod';
import { RoomValidationMessage, RoomValidationRules } from '../enums/enums.js';

type CreateRoomValidationDto = {
    roomName: z.ZodString;
};

const roomCreateValidationSchema = z
    .object<CreateRoomValidationDto>({
        roomName: z
            .string()
            .trim()
            .min(RoomValidationRules.MIN_ROOM_NAME_LENGTH, {
                message: RoomValidationMessage.ROOM_MIN_CHARS,
            })
            .max(RoomValidationRules.MAX_ROOM_NAME_LENGTH, {
                message: RoomValidationMessage.ROOM_MAX_CHARS,
            }),
    })
    .required();

export { roomCreateValidationSchema };
