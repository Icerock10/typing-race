import { SectionHeader } from '../section-header/section-header.js';
import styles from './styles.module.css';
import { Cluster } from '~/libs/components/components.js';
import { ProgressPlayer } from '../player/player.js';
import { type RoomResponseDto } from '~/libs/types/types.js';

type Properties = {
    currentRoom?: RoomResponseDto;
    isRaceStarted: boolean;
};

const Progress: React.FC<Properties> = ({ currentRoom }) => {
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
                {currentRoom?.players.map((player) => (
                    <ProgressPlayer key={player.id} player={player} />
                ))}
            </div>
        </section>
    );
};

export { Progress };
