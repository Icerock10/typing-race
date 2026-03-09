import { z } from 'zod';
import { RoomValidationMessage, RoomValidationRules } from '../enums/enums.js';
import { GamesDifficulty, GameLanguage } from '../../../games/games.js';

type CreateRoomValidationDto = {
    roomName: z.ZodString;
    difficulty: z.ZodEnum<typeof GamesDifficulty>;
    maxPlayers: z.ZodString;
    language: z.ZodEnum<typeof GameLanguage>;
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
        difficulty: z.enum(GamesDifficulty),
        maxPlayers: z.string(),
        language: z.enum(GameLanguage),
    })
    .required();

export { roomCreateValidationSchema };
