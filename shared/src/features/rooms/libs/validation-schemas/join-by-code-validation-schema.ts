import { z } from 'zod';
import { RoomValidationMessage, RoomValidationRules } from '../enums/enums.js';

type JoinRoomByCodeValidationDto = {
    roomJoinCode: z.ZodString;
};

const joinRoomByCodeValidationSchema = z
    .object<JoinRoomByCodeValidationDto>({
        roomJoinCode: z
            .string()
            .trim()
            .min(RoomValidationRules.MIN_ROOM_BY_CODE_LENGTH, {
                message: RoomValidationMessage.ROOM_BY_CODE_MIN_CHARS,
            }),
    })
    .required();

export { joinRoomByCodeValidationSchema };
