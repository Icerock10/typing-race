import styles from './styles.module.css';
import { ButtonLabels } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { RegistrationForm } from './registration/registration.js';
import { SignInForm } from './sign-in/sign-in.js';

type TabValue = ValueOf<typeof ButtonLabels>;

type Properties = {
    activeTab: TabValue;
    handleTabClick: (tab: TabValue) => void;
};

const RightPanel: React.FC<Properties> = ({ activeTab, handleTabClick }) => {
    const getTab = (tab: string): React.ReactNode => {
        switch (tab) {
            case ButtonLabels.SIGN_IN: {
                return <SignInForm />;
            }
            case ButtonLabels.REGISTER: {
                return <RegistrationForm handleTabClick={handleTabClick} />;
            }
        }
        return <></>;
    };

    return (
        <div className={styles['auth-right-panel']}>{getTab(activeTab)}</div>
    );
};

export { RightPanel };
