import styles from './styles.module.css';
import { DiscordIcon } from '~/assets/image/discord/discord.img.js';
import { SignIn, Registration } from './components/components.js';
import { Button, Cluster } from '~/libs/components/components.js';
import {
    ButtonLabels,
    ButtonSizes,
    ButtonVariants,
    ClusterVariant,
} from '~/libs/enums/enums.js';

type Properties = {
    formTitle: string;
    formSubTitle: string;
    isSignIn?: boolean;
    handleTabClick: () => void;
};

const AuthCard: React.FC<Properties> = ({
    formTitle,
    formSubTitle,
    isSignIn,
    handleTabClick,
}) => {
    const isSignInText = isSignIn
        ? 'Don`t have an account?'
        : 'Already have an account?';

    return (
        <div className={styles['auth-card']}>
            <h2 className={styles['card-title']}>{formTitle}</h2>
            <div className={styles['card-subtitle']}>{formSubTitle}</div>
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
            {isSignIn ? <SignIn /> : <Registration />}
            <Cluster className={styles['switch-prompt']}>
                <span> {isSignInText} </span>
                <Button
                    onClick={handleTabClick}
                    size={ButtonSizes.FIT}
                    label={
                        isSignIn
                            ? ButtonLabels.REGISTER_FREE
                            : ButtonLabels.SIGN_IN
                    }
                    variant={ButtonVariants.GHOST}
                />
            </Cluster>
        </div>
    );
};

export { AuthCard };
