import styles from './styles.module.css';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { Cluster } from '~/libs/components/components.js';
import { ClusterVariant } from '~/libs/enums/enums.js';

const STATS_CONFIG = [
    { key: 'onlineUsers', dataStat: 'online', label: 'Online now' },
    { key: 'activeRooms', dataStat: 'rooms', label: 'Open rooms' },
    { key: 'wpm', dataStat: 'record', label: 'Todays record' },
] as const;

const Stats: React.FC = () => {
    const { stats } = useAppSelector((state) => state.game);

    return (
        <Cluster cluster={ClusterVariant.FLEX} className={styles['auth-stats']}>
            {STATS_CONFIG.map(({ key, dataStat, label }) => (
                <span
                    key={dataStat}
                    data-stat={dataStat}
                    className={styles['stat-value']}
                >
                    {key === 'activeRooms' ? stats?.[key].length : stats?.[key]}
                    <p className={styles['stat-label']}>{label}</p>
                </span>
            ))}
        </Cluster>
    );
};

export { Stats };
