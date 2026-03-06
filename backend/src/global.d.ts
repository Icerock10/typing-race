import { type UserDto } from 'shared';
import { type Server as SocketServer } from 'socket.io';
import { type OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest) => Promise<void>;
        discordOAuth2: OAuth2Namespace;
    }

    interface FastifyRequest {
        user: UserDto;
        io: SocketServer;
    }
}
