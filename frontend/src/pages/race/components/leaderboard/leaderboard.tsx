import styles from './styles.module.css';
import { Cluster, Avatar } from '~/libs/components/components.js';
import { SectionHeader } from '../section-header/section-header.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import { type RoomResponseDto } from '~/libs/types/types.js';

type Properties = {
    currentRoom?: RoomResponseDto;
};

const PLAYER_MAX_PROGRESS = 100;

const Leaderboard: React.FC<Properties> = ({ currentRoom }) => {
    const players = currentRoom?.players || [];
    return (
        <section className={styles['race-leaderboard']}>
            <SectionHeader>
                <span>LeaderBoard</span>
            </SectionHeader>
            <div className="leaderboard-list">
                {players.map((player, index) => {
                    const hasPlayerFinished =
                        player.progress === PLAYER_MAX_PROGRESS;
                    const clusterClasses = getClassNames(
                        styles['list-row'],
                        hasPlayerFinished && styles['finished'],
                    );
                    return (
                        <Cluster key={index} className={clusterClasses}>
                            <Avatar name={player.userName} />
                            {player.isTyping && (
                                <Cluster className={styles['typing-indicator']}>
                                    <span />
                                    <span />
                                    <span />
                                </Cluster>
                            )}
                            <div className={styles['racer-name']}>
                                {player.userName}
                            </div>
                            {player.isWinner ? (
                                <Cluster className={styles['winner-stats']}>
                                    <span
                                        className={styles['winner-stats-wpm']}
                                    >
                                        {player.wpm} wpm
                                    </span>
                                    <span>{player.accuracy}% acc</span>
                                    <span>0:41</span>
                                </Cluster>
                            ) : (
                                <div className={styles['racer-percent']}>
                                    {player.progress}%
                                </div>
                            )}
                        </Cluster>
                    );
                })}
            </div>
        </section>
    );
};

export { Leaderboard };
