import { type Server as SocketServer, type Socket as TSocket } from 'socket.io';
import {
    SocketNamespace,
    LobbySocketEvent,
} from '~/libs/modules/socket/libs/enums/enums.js';
import { type RoomPayload } from '~/libs/types/types.js';
import { type LobbyService } from './lobby-service.module.js';

type Constructor = {
    socket: TSocket;
    io: SocketServer;
    lobbyService: LobbyService;
};

class LobbyHandler {
    private socket;
    private io;
    private lobbyService;

    constructor({ socket, io, lobbyService }: Constructor) {
        this.socket = socket;
        this.io = io;
        this.registerEvents();
        this.lobbyService = lobbyService;
    }

    private registerEvents(): void {
        this.socket.on(LobbySocketEvent.CREATE_ROOM, this.createRoom);
        this.socket.on(LobbySocketEvent.JOIN_ROOM, this.joinRoom);
        this.socket.on(LobbySocketEvent.LEAVE_ROOM, this.leaveRoom);
        this.socket.on(LobbySocketEvent.REFRESH_ROOM, this.getActiveRooms);
        this.socket.on(LobbySocketEvent.AUTH_UPDATE, this.updateUserAuth);
    }

    private createRoom = (roomData: RoomPayload): void => {
        const { room, roomId } = this.lobbyService.createRoom({
            roomData,
            socket: this.socket,
        });
        void this.socket.join(roomId as string);
        this.socket.emit(LobbySocketEvent.CREATE_ROOM, room);
        this.socket.broadcast.emit(LobbySocketEvent.CREATE_ROOM, room);
    };

    private updateUserAuth = async ({
        userId,
    }: {
        userId: string;
    }): Promise<void> => {
        await this.lobbyService.updateUserAuth({ userId, socket: this.socket });
    };

    private joinRoom = ({ roomId }: { roomId: string }): void => {
        const roomData = this.lobbyService.joinRoom({
            socket: this.socket,
            roomId,
        });
        void this.socket.join(roomId);
        this.socket.emit(LobbySocketEvent.JOIN_ROOM, roomData?.room);

        if (roomData?.user) {
            this.socket.broadcast.emit(
                LobbySocketEvent.JOIN_ROOM,
                roomData.room,
            );
        }
    };
    private leaveRoom = ({ roomId }: { roomId: string }): void => {
        const roomData = this.lobbyService.leaveRoom({
            socket: this.socket,
            roomId,
        });
        void this.socket.leave(roomId);

        if (!roomData) {
            return;
        }
        const { room, user } = roomData;
        this.socket.emit(LobbySocketEvent.LEAVE_ROOM, room);

        this.socket.broadcast.emit(LobbySocketEvent.LEAVE_ROOM, room);

        if (room.hostId === user.id) {
            this.lobbyService.scheduleRoomDeletion(roomId, () => {
                this.io
                    .of(SocketNamespace.GAME)
                    .emit(LobbySocketEvent.ROOM_DELETED, { roomId });
            });
        }
    };

    private getActiveRooms = (): void => {
        const rooms = this.lobbyService.getActiveRooms();

        this.socket.emit(LobbySocketEvent.REFRESH_ROOM, rooms);
    };
}

export { LobbyHandler };
