import { Header, Button, Link, Cluster } from '~/libs/components/components.js';
import { LeftPanel, RightPanel } from './components/components.js';
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

    const handleTabClick = useCallback((tab: ValueOf<typeof ButtonLabels>) => {
        setActiveTab(tab);
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
                        onClick={handleTabClick}
                    />
                    <Button
                        size={ButtonSizes.SMALL}
                        label={ButtonLabels.REGISTER}
                        variant={ButtonVariants.TAB}
                        onClick={handleTabClick}
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
                <LeftPanel />
                <RightPanel
                    handleTabClick={handleTabClick}
                    activeTab={activeTab}
                />
            </Cluster>
        </>
    );
};

export { Auth };
