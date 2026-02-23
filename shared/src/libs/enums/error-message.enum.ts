const ErrorMessage = {
    AUTHENTICATION_FAILED: 'Authentication failed.',
    AUTHORIZATION_HEADER_MISSING: 'Authorization header is missing or invalid.',
    CATEGORY_NOT_FOUND: 'Category does not exist',
    FORBIDDEN: 'Forbidden',
    ID_INVALID: 'Invalid user id',
    MISSING_REQUEST: 'Missing original request for multipart processing',
    UNAUTHORIZED_ACCESS: 'Unauthorized access',
    USER_NOT_FOUND: 'User not found.',
} as const;

export { ErrorMessage };
