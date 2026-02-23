import { type UserSignUpFormDto } from '~/libs/types/types.js';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpFormDto = {
    confirmPassword: '',
    email: '',
    name: '',
    password: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
