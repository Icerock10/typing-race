import { useAppForm, useCallback, useAppDispatch } from '~/libs/hooks/hooks.js';
import { type UserSignInRequestDto } from '~/libs/types/types.js';
import { userSignInValidationSchema } from '~/libs/types/types.js';
import styles from '../registration/styles.module.css';
import { DEFAULT_SIGN_IN_PAYLOAD } from '~/pages/auth/libs/constants/constants.js';
import { actions as authActions } from '~/features/auth/auth.js';
import { Input, Button } from '~/libs/components/components.js';
import { ButtonLabels, ButtonVariants } from '~/libs/enums/enums.js';

const SignIn: React.FC = () => {
    const dispatch = useAppDispatch();
    const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
        defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userSignInValidationSchema,
    });

    const onSubmit = useCallback(
        (event: React.BaseSyntheticEvent) => {
            void handleSubmit((data) => dispatch(authActions.signIn(data)))(
                event,
            );
        },
        [handleSubmit, dispatch],
    );

    return (
        <form noValidate onSubmit={onSubmit}>
            <Input
                label="Email"
                name="email"
                type="text"
                isRequired
                placeholder="you@example.com"
                errors={errors}
                control={control}
            />
            <Input
                label="Password"
                name="password"
                type="password"
                isRequired
                placeholder="*********"
                errors={errors}
                control={control}
            />
            <Button
                label={ButtonLabels.SIGN_IN}
                variant={ButtonVariants.PRIMARY}
                className={styles['submit-button']}
                type="submit"
            />
        </form>
    );
};

export { SignIn };
