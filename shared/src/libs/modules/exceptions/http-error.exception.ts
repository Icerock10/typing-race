import { type ServerErrorType } from '../../enums/server-error-type.enum.js';
import { type HTTPCode } from '../http/http.js';
import { type ServerErrorDetail, type ValueOf } from '../../types/types.js';
import { ApplicationError } from './application-error.exception.js';

type Constructor = {
    cause?: unknown;
    details?: ServerErrorDetail[];
    errorType?: ValueOf<typeof ServerErrorType>;
    message: string;
    status: ValueOf<typeof HTTPCode>;
};

class HTTPError extends ApplicationError {
    public status: ValueOf<typeof HTTPCode>;

    public constructor({ cause, message, status }: Constructor) {
        super({
            cause,
            message,
        });

        this.status = status;
    }
}

export { HTTPError };
