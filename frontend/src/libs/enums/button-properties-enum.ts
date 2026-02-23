const ButtonLabels = {
    BACK: 'BACK',
    LOGIN: 'Login',
    NEXT: 'NEXT',
    REGISTER: 'Register',
    SIGN_IN: 'Sign in',
    SKIP: 'SKIP',
    SUBMIT: 'SUBMIT',
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
} as const;

export { ButtonLabels, ButtonSizes, ButtonVariants };
