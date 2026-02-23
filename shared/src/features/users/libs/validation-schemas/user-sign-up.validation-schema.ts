import { z } from 'zod';

import {
    UserValidationMessage,
    UserValidationRegexRule,
    UserValidationRule,
} from '../enums/enums.js';

const userSignUpValidationSchema = z
    .object({
        confirmPassword: z.string().trim(),
        email: z
            .string()
            .min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
                message: UserValidationMessage.FIELD_REQUIRED,
            })
            .regex(UserValidationRegexRule.EMAIL_VALID_CHARS_MIN_MAX, {
                message: UserValidationMessage.EMAIL_INVALID,
            }),
        name: z
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
    .required()
    .refine((data) => data.password === data.confirmPassword, {
        message: UserValidationMessage.PASSWORD_DOES_NOT_MATCH,
        path: ['confirmPassword'],
    });

type UserSignUpFormDto = z.infer<typeof userSignUpValidationSchema>;

export { type UserSignUpFormDto, userSignUpValidationSchema };
