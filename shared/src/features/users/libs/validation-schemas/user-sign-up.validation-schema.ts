import { z } from 'zod';

import {
    UserValidationMessage,
    UserValidationRegexRule,
    UserValidationRule,
} from '../enums/enums.js';

const userSignUpValidationSchema = z
    .object({
        userName: z
            .string()
            .min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
                message: UserValidationMessage.FIELD_REQUIRED,
            })
            .min(UserValidationRule.USERNAME_MIN_LENGTH, {
                message: UserValidationMessage.USERNAME_LENGTH,
            })
            .max(UserValidationRule.USERNAME_MAX_LENGTH, {
                message: UserValidationMessage.USERNAME_LENGTH,
            })
            .regex(UserValidationRegexRule.USERNAME_VALID_CHARS, {
                message: UserValidationMessage.USERNAME_INVALID_CHARS,
            }),
        avatarUrl: z.string(),
        email: z
            .string()
            .min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
                message: UserValidationMessage.FIELD_REQUIRED,
            })
            .regex(UserValidationRegexRule.EMAIL_VALID_CHARS_MIN_MAX, {
                message: UserValidationMessage.EMAIL_INVALID,
            }),
        firstName: z
            .string()
            .min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
                message: UserValidationMessage.FIELD_REQUIRED,
            })
            .min(UserValidationRule.NAME_MIN_LENGTH, {
                message: UserValidationMessage.NAME_LENGTH,
            })
            .max(UserValidationRule.NAME_MAX_LENGTH, {
                message: UserValidationMessage.NAME_LENGTH,
            }),
        lastName: z
            .string()
            .min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
                message: UserValidationMessage.FIELD_REQUIRED,
            })
            .min(UserValidationRule.NAME_MIN_LENGTH, {
                message: UserValidationMessage.NAME_LENGTH,
            })
            .max(UserValidationRule.NAME_MAX_LENGTH, {
                message: UserValidationMessage.NAME_LENGTH,
            }),
        password: z
            .string()
            .min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
                message: UserValidationMessage.FIELD_REQUIRED,
            }),
    })
    .required();

type UserSignUpFormDto = z.infer<typeof userSignUpValidationSchema>;

export { type UserSignUpFormDto, userSignUpValidationSchema };
