import styles from './styles.module.css';
import { AvatarPicker } from './components/components.js';
import { Cluster, Input } from '~/libs/components/components.js';
import { ClusterVariant } from '~/libs/enums/enums.js';
import { type UserSignUpRequestDto } from '~/libs/types/types.js';
import { useAppForm } from '~/libs/hooks/hooks.js';

const Registration: React.FC = () => {
    const { control, errors } = useAppForm<UserSignUpRequestDto>({
        defaultValues: {},
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
            <AvatarPicker />
        </>
    );
};

export { Registration };
