import styles from './styles.module.css';
import {
    DEFAULT_AVATAR_ICONS,
    DEFAULT_SIGN_UP_PAYLOAD,
} from '~/pages/auth/libs/constants/constants.js';
import { actions as authActions } from '~/features/auth/auth.js';
import {
    Cluster,
    Input,
    RadioGroup,
    Button,
    Loader,
} from '~/libs/components/components.js';
import {
    ClusterVariant,
    ButtonLabels,
    ButtonVariants,
} from '~/libs/enums/enums.js';
import {
    userSignUpValidationSchema,
    type UserSignUpRequestDto,
} from '~/libs/types/types.js';
import { useAppForm, useCallback, useAppDispatch } from '~/libs/hooks/hooks.js';
import { type BaseSyntheticEvent } from 'react';

const AVATAR_OPTIONS = DEFAULT_AVATAR_ICONS.map(({ name, src }) => ({
    label: name,
    value: name,
    icon: <img className={styles['icon-image']} alt={name} src={src} />,
}));

type Properties = {
    isLoading: boolean;
};

const Registration: React.FC<Properties> = ({ isLoading }) => {
    const [option] = AVATAR_OPTIONS;
    const dispatch = useAppDispatch();
    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
        defaultValues: {
            ...DEFAULT_SIGN_UP_PAYLOAD,
            avatarUrl: option?.value,
        },
        validationSchema: userSignUpValidationSchema,
    });

    const onSubmit = useCallback(
        (event: BaseSyntheticEvent) => {
            void handleSubmit((data) => dispatch(authActions.signUp(data)))(
                event,
            );
        },
        [handleSubmit, dispatch],
    );

    return (
        <form noValidate onSubmit={onSubmit}>
            <Cluster
                cluster={ClusterVariant.FLEX}
                className={styles['input-row']}
            >
                <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    isRequired
                    placeholder="Alex"
                    errors={errors}
                    control={control}
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    isRequired
                    placeholder="Smith"
                    errors={errors}
                    control={control}
                />
            </Cluster>
            <Input
                label="User Name"
                name="userName"
                type="text"
                isRequired
                placeholder="vector_"
                errors={errors}
                control={control}
            />
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
                placeholder="********"
                errors={errors}
                control={control}
            />
            <Cluster>
                <RadioGroup
                    control={control}
                    errors={errors}
                    isIconOnly
                    label="Pick your avatar"
                    name="avatarUrl"
                    options={AVATAR_OPTIONS}
                />
            </Cluster>
            <Button
                label={ButtonLabels.REGISTER}
                variant={ButtonVariants.PRIMARY}
                className={styles['submit-button']}
                loader={
                    <Loader
                        isLoading={isLoading}
                        size="small"
                        container="inline"
                    />
                }
                isDisabled={isLoading}
                type="submit"
            />
        </form>
    );
};

export { Registration };
