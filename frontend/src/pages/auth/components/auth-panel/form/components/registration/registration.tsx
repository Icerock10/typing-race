import styles from './styles.module.css';
import { DEFAULT_AVATAR_ICONS } from '~/pages/auth/libs/constants/constants.js';
import {
    Cluster,
    Input,
    RadioGroup,
    Button,
} from '~/libs/components/components.js';
import {
    ClusterVariant,
    ButtonLabels,
    ButtonVariants,
} from '~/libs/enums/enums.js';
import { type UserSignUpRequestDto } from '~/libs/types/types.js';
import { useAppForm } from '~/libs/hooks/hooks.js';

const AVATAR_OPTIONS = DEFAULT_AVATAR_ICONS.map(({ name, src }) => ({
    label: name,
    value: name,
    icon: <img className={styles['icon-image']} alt={name} src={src} />,
}));

const Registration: React.FC = () => {
    const [option] = AVATAR_OPTIONS;

    const { control, errors } = useAppForm<UserSignUpRequestDto>({
        defaultValues: {
            avatarUrl: option?.value,
        },
    });

    return (
        <>
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
            />
        </>
    );
};

export { Registration };
