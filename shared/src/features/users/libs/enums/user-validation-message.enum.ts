import { UserValidationRule } from './user-validation-rule.enum.js';

const UserValidationMessage = {
    CURRENT_PASSWORD_INVALID: 'Current password is incorrect',
    CURRENT_PASSWORD_REQUIRED:
        'Current password is required to change password',
    EMAIL_ALREADY_EXISTS: 'Email already in use',
    EMAIL_INVALID: 'Invalid email format',
    EMAIL_INVALID_TYPE: 'This field requires a string value',
    ENTER_VALID_DATE_OF_BIRTH: 'Please enter a valid date of birth',
    FAILED_TO_UPDATE_PROFILE: 'Failed to update user profile',
    FIELD_REQUIRED: 'Field is required',
    LINK_HAS_EXPIRED: 'Link has expired',
    NAME_INVALID: `Name must be between ${String(UserValidationRule.NAME_MIN_LENGTH)} and ${String(UserValidationRule.NAME_MAX_LENGTH)} characters`,
    NAME_LENGTH: `Name must have at least ${String(UserValidationRule.NAME_MIN_LENGTH)} characters and maximum of ${String(UserValidationRule.NAME_MAX_LENGTH)} characters`,
    NAME_ONLY_ALLOWED_CHARS: 'Digits and special characters are not allowed',
    NAME_SURROUNDING_RULE:
        'Spaces and hyphens are allowed, as long as they are surrounded by letters',
    NEW_PASSWORD_MUST_DIFFER:
        'Your new password needs to be different from the current one',
    PASSWORD_DOES_NOT_MATCH: 'Passwords don`t match',
    PASSWORD_INVALID: `Password should contain between ${String(UserValidationRule.PASSWORD_MIN_LENGTH)} to ${String(UserValidationRule.PASSWORD_MAX_LENGTH)} characters, at least one lowercase letter, one uppercase letter and one digit`,
    USER_NOT_FOUND: 'User not found',
    WRONG_PASSWORD: 'Wrong password',
} as const;

export { UserValidationMessage };
