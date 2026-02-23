import { type Server as SocketServer } from 'socket.io';
import { type Server } from 'node:http';

type SocketService = {
    io: SocketServer;
    initializeIo(_server: Server): void;
};

export { type SocketService };
