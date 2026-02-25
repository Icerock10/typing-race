import styles from './styles.module.css';
import { getClassNames } from '~/libs/helpers/get-class-names.js';
import { mockApi } from '~/libs/modules/api/api.js';
import { Cluster } from '~/libs/components/components.js';
import { ClusterVariant } from '~/libs/enums/enums.js';

const Stats: React.FC = () => {
    return (
        <Cluster cluster={ClusterVariant.FLEX} className={styles['auth-stats']}>
            {mockApi.stats.map((stat) => (
                <div key={stat.id}>
                    <div
                        data-stat={stat.id}
                        className={getClassNames(styles['stat-value'])}
                    >
                        {stat.value}
                    </div>
                    <div className={styles['stat-label']}>{stat.text}</div>
                </div>
            ))}
        </Cluster>
    );
};

export { Stats };
