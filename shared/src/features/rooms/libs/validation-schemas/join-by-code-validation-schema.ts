import { z } from 'zod';
import { RoomValidationMessage, RoomValidationRules } from '../enums/enums.js';

type JoinRoomByCodeValidationDto = {
    code: z.ZodString;
};

const joinRoomByCodeValidationSchema = z
    .object<JoinRoomByCodeValidationDto>({
        code: z
            .string()
            .trim()
            .min(RoomValidationRules.MIN_ROOM_BY_CODE_LENGTH, {
                message: RoomValidationMessage.ROOM_BY_CODE_MIN_CHARS,
            }),
    })
    .required();

export { joinRoomByCodeValidationSchema };
