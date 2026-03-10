export { HandlerParameterIndexes } from './libs/constants/constants.js';
export { AppEnvironment, ErrorMessage } from './libs/enums/enums.js';
export { mockApi } from './libs/modules/mock-api/mock-api.js';
export {
    APIPath,
    ContentType,
    DataStatus,
    ServerErrorType,
    OpenAuthPath,
    OpenAuthProvider,
    DiscordApiPath,
} from './libs/enums/enums.js';
export {
    ApplicationError,
    AuthorizationError,
    HTTPError,
    ValidationError,
} from './libs/modules/exceptions/exceptions.js';
export { configureString } from './libs/helpers/helpers.js';
export { type Config as LibraryConfig } from './libs/types/config.js';
export {
    type HTTP,
    HTTPCode,
    HTTPHeader,
    type HTTPMethod,
    type HTTPOptions,
    HTTPRequestMethod,
} from './libs/modules/http/http.js';
export {
    type ServerCommonErrorResponse,
    type ServerErrorDetail,
    type ServerErrorResponse,
    type ServerValidationErrorResponse,
    type ZodType as ValidationSchema,
    type DiscordUserDto,
    type AppStatsDto,
    type ValueOf,
} from './libs/types/types.js';
export { AuthApiPath } from './features/auth/auth.js';
export {
    userSignInValidationSchema,
    userSignUpValidationSchema,
    UserValidationMessage,
    userIdParameterSchema,
} from './features/users/users.js';
export {
    type UserDto,
    UsersApiPath,
    type UserSignInRequestDto,
    type UserSignUpFormDto,
    type UserSignUpRequestDto,
    type UserResponseDto,
} from './features/users/users.js';

export {
    type GameDto,
    type GameResultDto,
    GamesDifficulty,
    GameLanguage,
    GameStatus,
} from './features/games/games.js';
export {
    type RoomPayload,
    type RoomResponseDto,
    roomCreateValidationSchema,
    joinRoomByCodeValidationSchema,
    RoomValidationMessage,
} from './features/rooms/rooms.js';
export {
    SocketNamespace,
    SocketEvent,
    RaceSocketEvent,
    LobbySocketEvent,
} from './libs/modules/socket/enums/enums.js';
