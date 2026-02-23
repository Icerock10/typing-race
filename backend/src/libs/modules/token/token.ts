import { config } from '~/libs/modules/config/config.js';

import { BaseToken } from './base-token.module.js';

const secret = new TextEncoder().encode(config.ENV.TOKEN.SECRET);
const encryption = config.ENV.TOKEN.ENCRYPTION;
const duration = config.ENV.TOKEN.EXPIRATION;

const token = new BaseToken({ duration, encryption, secret });

export { token };
export { BaseToken } from './base-token.module.js';
