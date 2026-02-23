import { ErrorMessage } from '../../enums/enums.js';
import { HTTPCode } from '../http/http.js';
import { type ValueOf } from '../../types/types.js';
import { HTTPError } from './http-error.exception.js';

type Constructor = {
    cause?: unknown;
    message?: string;
    status?: ValueOf<typeof HTTPCode>;
};

class AuthorizationError extends HTTPError {
    public constructor({
        cause,
        message = ErrorMessage.AUTHENTICATION_FAILED,
        status = HTTPCode.UNAUTHORIZED,
    }: Constructor = {}) {
        super({
            cause,
            message,
            status,
        });
    }
}

export { AuthorizationError };
