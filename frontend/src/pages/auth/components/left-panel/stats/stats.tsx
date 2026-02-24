import styles from './styles.module.css';
import { getClassNames } from '~/libs/helpers/get-class-names.js';
import { Cluster } from '~/libs/components/components.js';
import { ClusterVariant } from '~/libs/enums/enums.js';

type Stat = {
    id: string;
    value: number;
    text: string;
};

const stats: Stat[] = [
    { id: 'online', value: 1204, text: 'Online now' },
    { id: 'rooms', value: 14, text: 'Open rooms' },
    { id: 'record', value: 201, text: 'Today`s record' },
];

const Stats = (): React.ReactNode => {
    return (
        <Cluster cluster={ClusterVariant.FLEX} className={styles['auth-stats']}>
            {stats.map((stat) => (
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
