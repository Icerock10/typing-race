import { ClusterVariant } from '~/libs/enums/enums.js';
import { SectionHeader } from '../section-header/section-header.js';
import styles from './styles.module.css';
import { Cluster, Avatar } from '~/libs/components/components.js';
import { type UserDto, type RoomResponseDto } from '~/libs/types/types.js';

type Properties = {
    currentRoom?: RoomResponseDto;
    user: UserDto | null;
    isRaceStarted: boolean;
};

const RaceProgress: React.FC<Properties> = ({ currentRoom, user }) => {
    const userId = user?.id;
    return (
        <section className={styles['race-progress']}>
            <Cluster className={styles['track-header']}>
                <SectionHeader>
                    <span>Race progress</span>
                </SectionHeader>
                <span className={styles['players-count']}>
                    <span>{currentRoom?.players.length}</span>
                    <span>
                        {' / '}
                        {currentRoom?.maxPlayers} players
                    </span>
                </span>
            </Cluster>
            <div className={styles['tracks']}>
                {currentRoom?.players.map((player) => {
                    const me = userId === player.id;
                    return (
                        <Cluster
                            key={player.id}
                            cluster={ClusterVariant.GRID}
                            className={styles['player-track']}
                        >
                            <span className={styles['player-position']} />
                            <Cluster className={styles['player-info']}>
                                <Avatar name={player.userName} />
                                <span className={styles['player-name']}>
                                    {me && <span>(you) </span>}
                                    {player.userName}
                                </span>
                            </Cluster>
                            <div className={styles['track-bar-wrap']}>
                                <div
                                    style={{
                                        width: `${String(player.progress)}%`,
                                    }}
                                    className={styles['track-bar-fill']}
                                />
                            </div>
                            <span className={styles['track-wpm']}>
                                {player.wpm} wpm
                            </span>
                        </Cluster>
                    );
                })}
            </div>
        </section>
    );
};

export { RaceProgress };
