import { Button, Input, Link } from '~/libs/components/components.js';
import { AppRoute, ButtonLabels, ButtonVariants } from '~/libs/enums/enums.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
    type UserSignUpFormDto,
    userSignUpValidationSchema,
} from '~/libs/types/types.js';
import { DEFAULT_SIGN_UP_PAYLOAD } from '~/pages/auth/libs/constants/constants.js';

import sharedStyles from '../shared/shared.module.css';

type Properties = {
    isLoading?: boolean;
    onSubmit: (payload: UserSignUpFormDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignUpFormDto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <form
            className={getClassNames(sharedStyles['form'], 'flex-cluster')}
            noValidate
            onSubmit={handleFormSubmit}
        >
            <div>
                <h2>Create Account</h2>
            </div>
            <Input
                control={control}
                errors={errors}
                isRequired
                label="Email"
                name="email"
                placeholder="johndoe@gmail.com"
                type="text"
            />
            <Input
                control={control}
                errors={errors}
                isRequired
                label="Name"
                name="name"
                placeholder="John"
                type="text"
            />
            <Input
                control={control}
                errors={errors}
                isRequired
                label="Password"
                name="password"
                placeholder="Your password"
                type="password"
            />
            <Input
                control={control}
                errors={errors}
                isRequired
                label="Confirm password"
                name="confirmPassword"
                placeholder="Confirm password"
                type="password"
            />
            <Button
                className={sharedStyles['form-button']}
                label={ButtonLabels.REGISTER}
                type="submit"
                variant={ButtonVariants.SECONDARY}
            />
            <div>
                <span>
                    Already have an account?{' '}
                    <Link to={AppRoute.SIGN_IN}>Log In</Link>
                </span>
            </div>
        </form>
    );
};

export { SignUpForm };
