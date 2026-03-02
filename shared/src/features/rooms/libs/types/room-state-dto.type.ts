import { type GameDto } from '../../../games/games.js';

type RoomStateDto = GameDto & { roomId: string; players: Set<string> };

export { type RoomStateDto };
