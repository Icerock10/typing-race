import { encryptor } from '~/libs/modules/encryptor/encryptor.js';
import { logger } from '~/libs/modules/logger/logger.js';
import { token } from '~/libs/modules/token/token.js';
import { userService } from '~/features/users/users.js';
import { openAuthRepository } from '../open-auth/open-auth.js';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService({
    encryptor,
    token,
    userService,
    openAuthRepository,
});
const authController = new AuthController(logger, authService);

export { authController, authService };
