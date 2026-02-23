import fp from 'fastify-plugin';
import { type Server as SocketServer } from 'socket.io';

type Options = {
    io: SocketServer;
};

const socket = fp<Options>((fastify, { io }, done) => {
    fastify.decorateRequest('io', null as unknown as Options['io']);

    fastify.addHook('preHandler', (request, _reply, next) => {
        request.io = io;
        next();
    });
    done();
});

export { socket };
