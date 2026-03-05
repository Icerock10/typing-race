import { ServerErrorType } from '../../enums/enums.js';
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
    public details: ServerErrorDetail[];
    public errorType: ValueOf<typeof ServerErrorType>;
    public status: ValueOf<typeof HTTPCode>;

    public constructor({
        cause,
        message,
        status,
        errorType,
        details,
    }: Constructor) {
        super({
            cause,
            message,
        });

        this.details = details ?? [];
        this.errorType = errorType ?? ServerErrorType.COMMON;
        this.status = status;
    }
}

export { HTTPError };
