import styles from './styles.module.css';
import { useAppSelector, useMemo } from '~/libs/hooks/hooks.js';
import { Cluster } from '~/libs/components/components.js';
import { ClusterVariant } from '~/libs/enums/enums.js';
import { STATS_CONFIG } from './libs/enums/stats-config.enum.js';
import { type AppStatsDto } from '~/libs/types/types.js';

const STATS_DEFAULT_VALUE = 0;

const Stats: React.FC = () => {
    const { stats, games } = useAppSelector((state) => state.game);
    const wpmRecord = useMemo(
        () =>
            Math.max.apply(
                null,
                games
                    .flatMap((game) => game.results)
                    .map((result) => result.wpm),
            ),
        [games],
    );

    const prepareStats = (key: keyof AppStatsDto): number => {
        switch (key) {
            case 'activeRooms': {
                return stats?.[key].length || STATS_DEFAULT_VALUE;
            }
            case 'wpm': {
                return wpmRecord;
            }

            default: {
                return stats?.[key] || STATS_DEFAULT_VALUE;
            }
        }
    };

    return (
        <Cluster cluster={ClusterVariant.FLEX} className={styles['auth-stats']}>
            {STATS_CONFIG.map(({ key, dataStat, label }) => (
                <span
                    key={dataStat}
                    data-stat={dataStat}
                    className={styles['stat-value']}
                >
                    {prepareStats(key)}
                    <p className={styles['stat-label']}>{label}</p>
                </span>
            ))}
        </Cluster>
    );
};

export { Stats };
