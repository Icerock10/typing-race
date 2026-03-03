import { z } from 'zod';
import { UserValidationRule } from '../enums/user-validation-rule.enum.js';

const userIdParameterSchema = z.object({
    params: z.object({
        id: z.string().min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH, {
            message: 'ID is required',
        }),
    }),
});

export { userIdParameterSchema };
