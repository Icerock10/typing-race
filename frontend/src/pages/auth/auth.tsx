import { Header, Button, Link, Cluster } from '~/libs/components/components.js';
import { DemoPanel, AuthPanel } from './components/components.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
    ButtonVariants,
    ButtonLabels,
    AppRoute,
    ClusterVariant,
    ButtonSizes,
} from '~/libs/enums/enums.js';
import { useState, useCallback } from '~/libs/hooks/hooks.js';
import styles from './styles.module.css';

const Auth: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ValueOf<typeof ButtonLabels>>(
        ButtonLabels.REGISTER,
    );
    const handleSignInTabClick = useCallback(() => {
        setActiveTab(ButtonLabels.SIGN_IN);
    }, []);

    const handleRegisterTabClick = useCallback(() => {
        setActiveTab(ButtonLabels.REGISTER);
    }, []);

    return (
        <>
            <div className={styles['glow-top-left']} />
            <Header>
                <div className={styles['header-tabs']}>
                    <Button
                        size={ButtonSizes.SMALL}
                        label={ButtonLabels.SIGN_IN}
                        variant={ButtonVariants.TAB}
                        isActive={activeTab === ButtonLabels.SIGN_IN}
                        value={ButtonLabels.SIGN_IN}
                        onClick={handleSignInTabClick}
                    />
                    <Button
                        size={ButtonSizes.SMALL}
                        label={ButtonLabels.REGISTER}
                        variant={ButtonVariants.TAB}
                        onClick={handleRegisterTabClick}
                        isActive={activeTab === ButtonLabels.REGISTER}
                        value={ButtonLabels.REGISTER}
                    />
                </div>
                <div className={styles['header-nav']}>
                    <span>Back to </span>
                    <Link to={AppRoute.ROOT}>lobby →</Link>
                </div>
            </Header>
            <Cluster cluster={ClusterVariant.GRID} className={styles['auth']}>
                <DemoPanel />
                <AuthPanel
                    handleSignInTabClick={handleSignInTabClick}
                    handleRegisterTabClick={handleRegisterTabClick}
                    activeTab={activeTab}
                />
            </Cluster>
        </>
    );
};

export { Auth };
