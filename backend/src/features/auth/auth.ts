import { encryptor } from '~/libs/modules/encryptor/encryptor.js';
import { logger } from '~/libs/modules/logger/logger.js';
import { token } from '~/libs/modules/token/token.js';
import { userService } from '~/features/users/users.js';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService({ encryptor, token, userService });
const authController = new AuthController(logger, authService);

export { authController, authService };
