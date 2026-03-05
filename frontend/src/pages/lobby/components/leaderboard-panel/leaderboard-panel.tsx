import styles from './styles.module.css';
import { mockApi } from '~/libs/modules/api/api.js';
import { Cluster, Avatar } from '~/libs/components/components.js';

const LeaderBoardPanel: React.FC = () => {
    return (
        <div className={styles['leaderboard']}>
            <div className={styles['leaderboard-title']}>Today`s top 5</div>
            {mockApi.racersPreview.map((racer, index) => {
                return (
                    <Cluster
                        key={racer.name}
                        className={styles['leaderboard-row']}
                    >
                        <span className={styles['row-rank']}>{++index}</span>
                        <Avatar name={racer.name} />
                        <span className={styles['row-name']}>{racer.name}</span>
                        <span className={styles['row-wpm']}>
                            {racer.wpm} wpm
                        </span>
                    </Cluster>
                );
            })}
        </div>
    );
};

export { LeaderBoardPanel };
