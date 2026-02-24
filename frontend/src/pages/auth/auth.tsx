import { Header, Button, Link, Cluster } from '~/libs/components/components.js';
import { LeftPanel, RightPanel } from './components/components.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
    ButtonVariants,
    ButtonLabels,
    AppRoute,
    ClusterVariant,
} from '~/libs/enums/enums.js';
import { useState, useCallback } from '~/libs/hooks/hooks.js';
import styles from './styles.module.css';

const Auth: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ValueOf<typeof ButtonLabels>>(
        ButtonLabels.SIGN_IN,
    );

    const toggleTab = useCallback(() => {
        setActiveTab((previous) =>
            previous === ButtonLabels.SIGN_IN
                ? ButtonLabels.REGISTER
                : ButtonLabels.SIGN_IN,
        );
    }, []);

    return (
        <>
            <div className={styles['glow-top-left']} />
            <Header>
                <div className={styles['header-tabs']}>
                    <Button
                        size="small"
                        label={ButtonLabels.SIGN_IN}
                        variant={ButtonVariants.TAB}
                        isActive={activeTab === ButtonLabels.SIGN_IN}
                        onClick={toggleTab}
                    />
                    <Button
                        size="small"
                        label={ButtonLabels.REGISTER}
                        variant={ButtonVariants.TAB}
                        onClick={toggleTab}
                        isActive={activeTab === ButtonLabels.REGISTER}
                    />
                </div>
                <div className={styles['header-nav']}>
                    <span>Back to </span>
                    <Link to={AppRoute.ROOT}>lobby →</Link>
                </div>
            </Header>
            <Cluster cluster={ClusterVariant.GRID} className={styles['auth']}>
                <LeftPanel />
                <RightPanel />
            </Cluster>
        </>
    );
};

export { Auth };
