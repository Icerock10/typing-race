import styles from './styles.module.css';
import { type GameDto } from '~/libs/types/types.js';

type Properties = {
    games: GameDto[];
};

const Ticker: React.FC<Properties> = ({ games }) => {
    const gameResults = games.flatMap((game) =>
        game.results.map((result) => ({ ...result, gameTitle: game.title })),
    );

    return (
        <div className={styles['ticker-bar']}>
            <div className={styles['ticker-inner']}>
                {gameResults.map(({ userName, gameTitle, wpm }, index) => (
                    <div key={index} className={styles['ticker-item']}>
                        <span>
                            🏁 {userName} finished with {wpm} WPM — room{' '}
                            {gameTitle}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Ticker };
