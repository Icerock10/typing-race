import { io, type Socket as LibrarySocket } from 'socket.io-client';

class BaseSocketManager {
    private sockets: Map<string, LibrarySocket> = new Map();

    public getSocket(
        namespace: string,
        auth?: Record<string, unknown>,
    ): LibrarySocket {
        if (!this.sockets.has(namespace)) {
            const socket = io(namespace, {
                transports: ['websocket'],
                autoConnect: false,
                auth,
                ...this.getReconnectSettings(),
            });

            this.sockets.set(namespace, socket);
        }

        return this.sockets.get(namespace) as LibrarySocket;
    }

    private getReconnectSettings(): Record<string, unknown> {
        return {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        };
    }
}

export { BaseSocketManager };
