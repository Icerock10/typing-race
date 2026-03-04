import styles from './styles.module.css';
import { ButtonLabels } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { AuthCard } from './form/auth-card.js';

type TabValue = ValueOf<typeof ButtonLabels>;

type Properties = {
    activeTab: TabValue;
    handleSignInTabClick: () => void;
    handleRegisterTabClick: () => void;
};

const AuthPanel: React.FC<Properties> = ({
    activeTab,
    handleRegisterTabClick,
    handleSignInTabClick,
}) => {
    const getAuthTab = (): React.ReactNode => {
        switch (activeTab) {
            case ButtonLabels.SIGN_IN: {
                return (
                    <AuthCard
                        formTitle="Welcome back 👋"
                        formSubTitle="Sign in to your account and get back to racing."
                        isSignIn
                        handleTabClick={handleRegisterTabClick}
                    />
                );
            }
            case ButtonLabels.REGISTER: {
                return (
                    <AuthCard
                        formTitle="Create account ⚡"
                        formSubTitle="Join the race. It takes less than a minute."
                        handleTabClick={handleSignInTabClick}
                    />
                );
            }
        }
    };

    return <div className={styles['auth-panel']}>{getAuthTab()}</div>;
};

export { AuthPanel };
