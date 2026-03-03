import styles from './styles.module.css';
import { ButtonLabels } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { Form } from './form/form.js';

type TabValue = ValueOf<typeof ButtonLabels>;

type Properties = {
    activeTab: TabValue;
    handleTabClick: (tab: TabValue) => void;
};

const AuthPanel: React.FC<Properties> = ({ activeTab, handleTabClick }) => {
    const toRegister = useCallback(() => {
        handleTabClick(ButtonLabels.REGISTER);
    }, [handleTabClick]);

    const toSignIn = useCallback(() => {
        handleTabClick(ButtonLabels.SIGN_IN);
    }, [handleTabClick]);

    const getTab = (tab: string): React.ReactNode => {
        switch (tab) {
            case ButtonLabels.SIGN_IN: {
                return (
                    <Form
                        formTitle="Welcome back 👋"
                        formSubTitle="Sign in to your account and get back to racing."
                        isSignIn
                        handleTabClick={toRegister}
                    />
                );
            }
            case ButtonLabels.REGISTER: {
                return (
                    <Form
                        formTitle="Create account ⚡"
                        formSubTitle="Join the race. It takes less than a minute."
                        handleTabClick={toSignIn}
                    />
                );
            }
        }
        return <></>;
    };

    return <div className={styles['auth-panel']}>{getTab(activeTab)}</div>;
};

export { AuthPanel };
