import { UserValidationRule } from './user-validation-rule.enum.js';

const UserValidationRegexRule = {
    EMAIL_VALID_CHARS_MIN_MAX: new RegExp(
        `^(?!\\.)((?!\\.{2})[\\w!#$%&'*+=?^\`{|}~./-]){${String(UserValidationRule.EMAIL_LOCAL_MIN_LENGTH)},${String(UserValidationRule.EMAIL_LOCAL_MAX_LENGTH)}}(?<!\\.)@(?![-.])(?=.{${String(UserValidationRule.EMAIL_DOMAIN_MIN_LENGTH)},${String(UserValidationRule.EMAIL_DOMAIN_MAX_LENGTH)}}$)[\\dA-Za-z]+(?:-[\\dA-Za-z]+)*(?:\\.[\\dA-Za-z]+(?:-[\\dA-Za-z]+)*)+(?<![-.])$`,
    ),
    USERNAME_VALID_CHARS: new RegExp(/^[\w]+$/),
} as const;

export { UserValidationRegexRule };
