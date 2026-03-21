import styles from './styles.module.css';
import { Cluster, Avatar } from '~/libs/components/components.js';
import { useMemo } from '~/libs/hooks/hooks.js';
import { type GameDto } from '~/libs/types/types.js';

type Properties = {
    games: GameDto[];
};

const GAMES_START_INDEX = 0;
const GAMES_END_INDEX = 5;

const TopPlayers: React.FC<Properties> = ({ games }) => {
    const findTopFivePlayers = useMemo(
        () =>
            games
                .flatMap((game) => game.results)
                .toSorted((aPlayer, bPlayer) => bPlayer.wpm - aPlayer.wpm)
                .slice(GAMES_START_INDEX, GAMES_END_INDEX),
        [games],
    );

    return (
        <div className={styles['leaderboard']}>
            <div className={styles['leaderboard-title']}>Today`s top 5</div>
            {findTopFivePlayers.map(({ userName, wpm }, index) => {
                const rank = ++index;
                return (
                    <Cluster
                        key={userName}
                        className={styles['leaderboard-row']}
                    >
                        <span className={styles['row-rank']}>{rank}</span>
                        <Avatar name={userName} />
                        <span className={styles['row-name']}>{userName}</span>
                        <span className={styles['row-wpm']}>{wpm} wpm</span>
                    </Cluster>
                );
            })}
        </div>
    );
};

export { TopPlayers };
