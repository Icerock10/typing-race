import { config } from '~/libs/modules/config/config.js';
import { database } from '~/libs/modules/database/database.js';
import { logger } from '~/libs/modules/logger/logger.js';
import { authController } from '~/features/auth/auth.js';
import { userController } from '~/features/users/users.js';
import { socketService } from '../socket/socket.js';
import { BaseServerApplicationApi } from './base-server-application-api.js';
import { BaseServerApplication } from './base-server-application.js';

const apiV1 = new BaseServerApplicationApi(
    'v1',
    ...userController.routes,
    ...authController.routes,
);
const serverApplication = new BaseServerApplication({
    apis: [apiV1],
    config,
    database,
    logger,
    socket: socketService,
});

export { serverApplication };
export { type ServerApplicationRouteParameters } from './libs/types/types.js';
