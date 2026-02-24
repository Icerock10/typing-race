import styles from './styles.module.css';
import { DiscordIcon } from '~/assets/image/discord/discord.img.js';
import { AvatarPicker } from './components/components.js';
import { Button, Cluster, Input } from '~/libs/components/components.js';
import {
    ButtonLabels,
    ButtonVariants,
    ClusterVariant,
} from '~/libs/enums/enums.js';
import { type UserSignInRequestDto, type ValueOf } from '~/libs/types/types.js';
import { useAppForm } from '~/libs/hooks/hooks.js';

type Properties = {
    handleTabClick: (tab: ValueOf<typeof ButtonLabels>) => void;
};

const RegistrationForm: React.FC<Properties> = ({ handleTabClick }) => {
    const { control, errors } = useAppForm<UserSignInRequestDto>({
        defaultValues: {},
    });

    return (
        <form className={styles['form']}>
            <h2 className={styles['form-title']}>Create account ⚡</h2>
            <div className={styles['form-subtitle']}>
                Join the race. It takes less than a minute.
            </div>
            <Button
                label={ButtonLabels.SIGN_UP}
                icon={<DiscordIcon />}
                className={styles['discord-btn']}
                variant={ButtonVariants.PRIMARY}
            />
            <Cluster
                cluster={ClusterVariant.FLEX}
                className={styles['divider']}
            >
                <div className={styles['divider-line']} />
                <span className={styles['divider-text']}>or with email</span>
                <div className={styles['divider-line']} />
            </Cluster>
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
            <Button
                label={ButtonLabels.CREATE}
                className={styles['create-btn']}
                variant={ButtonVariants.PRIMARY}
            />
            <Cluster className={styles['switch-prompt']}>
                <span> Already have an account? </span>
                <Button
                    onClick={handleTabClick}
                    value={ButtonLabels.SIGN_IN}
                    size="fit"
                    label={ButtonLabels.SIGN_IN}
                    variant={ButtonVariants.GHOST}
                />
            </Cluster>
        </form>
    );
};

export { RegistrationForm };
