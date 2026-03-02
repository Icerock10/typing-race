const SocketEvent = {
    CONNECTION: 'connection',
    NOTIFICATION_JOIN_ROOM: 'notification-join-room',
    NOTIFICATION_LEAVE_ROOM: 'notification-leave-room',
    CREATE_ROOM: 'create-room',
    JOIN_ROOM: 'join-room',
} as const;

const SocketNamespace = {
    NOTIFICATION: '/notification',
} as const;

export { SocketNamespace, SocketEvent };
