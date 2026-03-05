import { OpenAuthRepository } from './open-auth.repository.js';
import { openAuthModel } from './open-auth.model.js';

const openAuthRepository = new OpenAuthRepository(openAuthModel);
export { openAuthRepository };
export { openAuthConfig } from './config/open-auth-config.js';
