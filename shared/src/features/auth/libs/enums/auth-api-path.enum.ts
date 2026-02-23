const AuthApiPath = {
    CURRENT_USER: '/current-user',
    ROOT: '/',
    SIGN_IN: '/login',
    SIGN_UP: '/register',
    VERIFY_TOKEN: '/verify-token',
} as const;

export { AuthApiPath };
