import styles from './styles.module.css';
import { SectionHeader } from '../section-header/section-header.js';
import { type RoomResponseDto } from '~/libs/types/types.js';
import { LeaderBoardPlayer } from '../player/player.js';

type Properties = {
    currentRoom?: RoomResponseDto;
};

const Leaderboard: React.FC<Properties> = ({ currentRoom }) => {
    const players = currentRoom?.players || [];
    return (
        <section className={styles['race-leaderboard']}>
            <SectionHeader>
                <span>LeaderBoard</span>
            </SectionHeader>
            <div>
                {players.map((player) => (
                    <LeaderBoardPlayer
                        key={player.id}
                        startedAt={currentRoom?.startedAt}
                        player={player}
                    />
                ))}
            </div>
        </section>
    );
};

export { Leaderboard };
