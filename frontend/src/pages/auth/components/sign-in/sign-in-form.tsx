import { Button, Input, Link } from '~/libs/components/components.js';
import { AppRoute, ButtonLabels, ButtonVariants } from '~/libs/enums/enums.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from '~/libs/types/types.js';
import { DEFAULT_SIGN_IN_PAYLOAD } from '~/pages/auth/libs/constants/constants.js';

import sharedStyles from '../shared/shared.module.css';
import styles from './styles.module.css';

type Properties = {
    isLoading?: boolean;
    onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
        defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userSignInValidationSchema,
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
                <h2>Welcome back</h2>
                <p className={styles['login-to-account']}>
                    Login to your account
                </p>
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
                label="Password"
                name="password"
                placeholder="Your password"
                type="password"
            />
            <Button
                className={sharedStyles['form-button']}
                label={ButtonLabels.LOGIN}
                type="submit"
                variant={ButtonVariants.SECONDARY}
            />
            <div>
                <span>
                    Don&apos;t have an account?{' '}
                    <Link to={AppRoute.SIGN_UP}>Sign Up</Link>
                </span>
            </div>
        </form>
    );
};

export { SignInForm };
