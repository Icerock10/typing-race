import {
    ButtonLabels,
    ButtonVariants,
    ClusterVariant,
} from '~/libs/enums/enums.js';
import { SectionHeader } from '../section-header/section-header.js';
import styles from './styles.module.css';
import { Cluster, Avatar, Button } from '~/libs/components/components.js';
import { type RoomResponseDto } from '~/libs/types/types.js';

type Properties = {
    currentRoom?: RoomResponseDto;
};

const RaceProgress: React.FC<Properties> = ({ currentRoom }) => {
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
                                    {player.userName}
                                </span>
                            </Cluster>
                            <div className={styles['track-bar-wrap']}>
                                <div className={styles['track-bar-fill']} />
                            </div>
                            <Button
                                label={ButtonLabels.READY}
                                variant={ButtonVariants.SECONDARY}
                            />
                        </Cluster>
                    );
                })}
            </div>
        </section>
    );
};

export { RaceProgress };
