import { RoomValidationRules } from './room-validation-rules.enum.js';

const RoomValidationMessage = {
    ROOM_MIN_CHARS: `Room name must be at least ${String(RoomValidationRules.MIN_ROOM_NAME_LENGTH)} characters`,
    ROOM_BY_CODE_MIN_CHARS: `Room code must be at least ${String(RoomValidationRules.MIN_ROOM_NAME_LENGTH)} characters`,
    ROOM_MAX_CHARS: `Room name must be at most ${String(RoomValidationRules.MAX_ROOM_NAME_LENGTH)} characters`,
    INVALID_JOIN_CODE: 'Code is not valid',
} as const;

export { RoomValidationMessage };
