const ButtonLabels = {
    REGISTER: 'Register',
    REGISTER_FREE: 'Register for free',
    CREATE: 'Create Account →',
    CREATE_ROOM: '+ Create Room',
    SIGN_UP: 'Sign with Discord',
    SIGN_IN: 'Sign in',
    REFRESH: 'Refresh ↻',
    SPECTATE: 'Spectate',
    JOIN: 'Join',
} as const;

const ButtonVariants = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TRANSPARENT: 'transparent',
    TAB: 'tab',
    GHOST: 'ghost',
} as const;

const ButtonSizes = {
    LARGE: 'large',
    SMALL: 'small',
    FIT: 'fit',
} as const;

export { ButtonLabels, ButtonSizes, ButtonVariants };
