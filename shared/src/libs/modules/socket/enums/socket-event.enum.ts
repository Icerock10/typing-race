const SocketEvent = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    NOTIFICATION_JOIN_ROOM: 'notification-join-room',
    NOTIFICATION_LEAVE_ROOM: 'notification-leave-room',
    LOBBY_CREATE_ROOM: 'lobby-create-room',
    LOBBY_JOIN_ROOM: 'lobby-join-room',
    LOBBY_ROOM_DELETED: 'lobby-room-deleted',
    LOBBY_LEAVE_ROOM: 'lobby-leave-room',
    LOBBY_REFRESH_ROOM: 'lobby-refresh-room',
    LOBBY_STATS_INFO: 'lobby-stats-info',
    LOBBY_AUTH_UPDATE: 'lobby-auth-update',
} as const;

export { SocketEvent };
