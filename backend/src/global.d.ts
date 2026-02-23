import { type UserDto } from 'shared';
import { type Server as SocketServer } from 'socket.io';

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest) => Promise<void>;
    }

    interface FastifyRequest {
        user: UserDto;
        io: SocketServer;
    }
}
