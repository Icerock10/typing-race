import { type UserSignUpFormDto } from '~/libs/types/types.js';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpFormDto = {
    email: '',
    firstName: '',
    userName: '',
    password: '',
    avatarUrl: '',
    lastName: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
