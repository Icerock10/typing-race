import { type UserSignInRequestDto } from '~/libs/types/types.js';

const DEFAULT_SIGN_IN_PAYLOAD: UserSignInRequestDto = {
    email: 'string',
    password: 'string',
    firstName: 'string',
    lastName: 'string',
    userName: 'string',
};

export { DEFAULT_SIGN_IN_PAYLOAD };
