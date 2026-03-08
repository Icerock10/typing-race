const AppRoute = {
    LOGOUT: '/logout',
    NOT_FOUND: '*',
    ROOT: '/',
    RACE: '/race/:roomId',
    RACE_BASE: '/race/',
    AUTH: '/auth',
    LOBBY: '/lobby',
} as const;

export { AppRoute };
