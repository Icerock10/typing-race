import { BaseHTTP } from './base-http.module.js';

const http = new BaseHTTP();

export { http };
export { HTTPError, HTTPHeader } from './libs/enums/enums.js';
export {
    type HTTP,
    type HTTPCode,
    type HTTPOptions,
} from './libs/types/types.js';
