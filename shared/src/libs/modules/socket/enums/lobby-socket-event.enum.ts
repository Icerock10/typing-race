const LobbySocketEvent = {
    CREATE_ROOM: 'lobby-create-room',
    JOIN_ROOM: 'lobby-join-room',
    ROOM_DELETED: 'lobby-room-deleted',
    LEAVE_ROOM: 'lobby-leave-room',
    REFRESH_ROOM: 'lobby-refresh-room',
    STATS_INFO: 'lobby-stats-info',
    AUTH_UPDATE: 'lobby-auth-update',
} as const;

export { LobbySocketEvent };
