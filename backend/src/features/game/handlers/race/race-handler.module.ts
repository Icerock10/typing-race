import { type Server as SocketServer, type Socket as TSocket } from 'socket.io';
import {
    RaceSocketEvent,
    SocketNamespace,
} from '~/libs/modules/socket/libs/enums/enums.js';
import { type RaceService } from './race-service.module.js';
import { type Player } from '../../libs/types/types.js';

type Constructor = {
    socket: TSocket;
    io: SocketServer;
    raceService: RaceService;
};

const DELAY = 5000;

class RaceHandler {
    private socket;
    private io;
    private raceService;

    constructor({ socket, io, raceService }: Constructor) {
        this.socket = socket;
        this.io = io;
        this.raceService = raceService;
        this.registerEvents();
    }

    private registerEvents(): void {
        this.socket.on(RaceSocketEvent.SET_READY_STATUS, this.setReadyStatus);
        this.socket.on(
            RaceSocketEvent.PLAYER_FINISHED,
            this.handlePlayerFinish,
        );
        this.socket.on(
            RaceSocketEvent.UPDATE_PROGRESS,
            this.updatePlayerProgress,
        );
    }

    private setReadyStatus = ({
        roomId,
        isReady,
    }: {
        roomId: string;
        isReady: boolean;
    }): void => {
        const roomData = this.raceService.setReadyStatus({
            roomId,
            isReady,
            socket: this.socket,
        });

        this.io
            .of(SocketNamespace.GAME)
            .to(roomId)
            .emit(RaceSocketEvent.SET_READY_STATUS, roomData?.room);

        if (roomData?.shouldStart) {
            setTimeout(() => {
                this.io
                    .of(SocketNamespace.GAME)
                    .to(roomId)
                    .emit(RaceSocketEvent.RACE_STARTED, roomData.startedRoom);
                this.startRace(
                    roomId,
                    roomData.startedRoom?.timeForGame as number,
                );
            }, DELAY);
        }
    };

    private handlePlayerFinish = ({ roomId }: { roomId: string }): void => {
        const room = this.raceService.handlePlayerFinish({
            roomId,
            socket: this.socket,
        });
        this.io
            .of(SocketNamespace.GAME)
            .to(roomId)
            .emit(RaceSocketEvent.PLAYER_FINISHED, room);
    };

    private startRace = (roomId: string, raceDuration: number): void => {
        const timer = setTimeout(() => {
            this.finishRace(roomId);
        }, raceDuration);

        this.raceService.setGameTimer({ roomId, timer });
    };

    private finishRace = (roomId: string): void => {
        const room = this.raceService.finishRace(roomId);
        if (room) {
            this.io
                .of(SocketNamespace.GAME)
                .emit(RaceSocketEvent.RACE_FINISHED, room);
        }
    };

    private updatePlayerProgress = ({
        playerProgress,
        roomId,
    }: {
        playerProgress: Player;
        roomId: string;
    }): void => {
        const { haveAllFinished, updatedRoomWithPlayerProgress } =
            this.raceService.updatePlayerProgress({
                socket: this.socket,
                playerProgress,
                roomId,
            });
        if (haveAllFinished) {
            this.finishRace(roomId);
            return;
        }
        this.io
            .of(SocketNamespace.GAME)
            .to(roomId)
            .emit(
                RaceSocketEvent.UPDATE_PROGRESS,
                updatedRoomWithPlayerProgress,
            );
    };
}

export { RaceHandler };
