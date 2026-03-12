import { Cluster, Avatar } from '~/libs/components/components.js';
import { getClassNames, formatDuration } from '~/libs/helpers/helpers.js';
import { type PlayerDto } from '~/libs/types/types.js';
import styles from './styles.module.css';

type Properties = {
    player: PlayerDto;
    startedAt?: number;
};

const LeaderBoardRow: React.FC<Properties> = ({ player, startedAt }) => {
    const finishedOn = formatDuration(
        Number(player.finishedAt) - Number(startedAt),
    );
    const clusterClasses = getClassNames(
        styles['list-row'],
        player.finishedAt && styles['finished'],
    );
    return (
        <Cluster className={clusterClasses}>
            <Avatar name={player.userName} />
            {player.isTyping && (
                <Cluster className={styles['typing-indicator']}>
                    {[...Array.from({ length: 3 }).keys()].map((key) => (
                        <span key={key} />
                    ))}
                </Cluster>
            )}
            <div className={styles['racer-name']}>{player.userName}</div>
            {player.isWinner ? (
                <Cluster className={styles['winner-stats']}>
                    <span className={styles['winner-stats-wpm']}>
                        {player.wpm} wpm
                    </span>
                    <span>{player.accuracy}% acc</span>
                    <span>{finishedOn}</span>
                </Cluster>
            ) : (
                <div className={styles['racer-percent']}>
                    {player.progress}%
                </div>
            )}
        </Cluster>
    );
};

export { LeaderBoardRow };
