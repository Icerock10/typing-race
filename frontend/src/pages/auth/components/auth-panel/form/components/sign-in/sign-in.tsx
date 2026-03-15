import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { type UserSignInRequestDto } from '~/libs/types/types.js';
import { userSignInValidationSchema } from '~/libs/types/types.js';
import styles from '../registration/styles.module.css';
import { DEFAULT_SIGN_IN_PAYLOAD } from '~/pages/auth/libs/constants/constants.js';
import { Input, Button, Loader } from '~/libs/components/components.js';
import { ButtonLabels, ButtonVariants } from '~/libs/enums/enums.js';

type Properties = {
    isLoading: boolean;
    onSignIn: (payload: UserSignInRequestDto) => void;
};

const SignIn: React.FC<Properties> = ({ isLoading, onSignIn }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
        defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userSignInValidationSchema,
    });

    const onSubmit = useCallback(
        (event: React.BaseSyntheticEvent) => {
            void handleSubmit(onSignIn)(event);
        },
        [handleSubmit, onSignIn],
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
                isDisabled={isLoading}
                loader={
                    <Loader
                        isLoading={isLoading}
                        size="small"
                        container="inline"
                    />
                }
                type="submit"
            />
        </form>
    );
};

export { SignIn };
