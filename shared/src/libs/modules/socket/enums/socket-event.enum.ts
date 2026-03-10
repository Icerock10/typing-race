const SocketEvent = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    NOTIFICATION_JOIN_ROOM: 'notification-join-room',
    NOTIFICATION_LEAVE_ROOM: 'notification-leave-room',
} as const;

export { SocketEvent };
