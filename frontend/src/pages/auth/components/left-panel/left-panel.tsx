import { Cluster } from '~/libs/components/components.js';
import { Stats } from './stats/stats.js';
import { RacePreview } from './race-preview/race-preview.js';
import { ClusterVariant } from '~/libs/enums/enums.js';
import styles from './styles.module.css';

const LeftPanel: React.FC = () => {
    return (
        <div className={styles['auth-left-panel']}>
            <Cluster
                cluster={ClusterVariant.FLEX}
                className={styles['left-panel-label']}
            >
                ⚡ Live right now
            </Cluster>
            <h1>
                Type fast.
                <br />
                <span>Race </span>
                <span className={styles['highlight']}>harder.</span>
                <br />
                Win big.
            </h1>
            <p className={styles['auth-left-sub']}>
                Join thousands of players competing in real-time typing battles.
                Every word counts.
            </p>
            <RacePreview />
            <Stats />
        </div>
    );
};

export { LeftPanel };
