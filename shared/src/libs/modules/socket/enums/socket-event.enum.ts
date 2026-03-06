const SocketEvent = {
    CONNECTION: 'connection',
    NOTIFICATION_JOIN_ROOM: 'notification-join-room',
    NOTIFICATION_LEAVE_ROOM: 'notification-leave-room',
    LOBBY_CREATE_ROOM: 'lobby-create-room',
    LOBBY_JOIN_ROOM: 'lobby-join-room',
    LOBBY_LEAVE_ROOM: 'lobby-leave-room',
} as const;

export { SocketEvent };
