import styles from './styles.module.css';
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

const AVATAR_ICONS = ['🐱', '🦊', '🐺', '🦅', '🤖', '👾', '🔥', '⚡'];

const AVATAR_OPTIONS = AVATAR_ICONS.map((icon, index) => ({
    label: `a-${String(index)}`,
    value: String(index),
    icon,
}));

const Registration: React.FC = () => {
    const { control, errors } = useAppForm<
        UserSignUpRequestDto & { avatar: string }
    >({
        defaultValues: {
            avatar: '0',
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
            <Cluster className={styles['avatar-group']}>
                <RadioGroup
                    control={control}
                    errors={errors}
                    isIconOnly
                    label="Pick your avatar"
                    name="avatar"
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
