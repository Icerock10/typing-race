import styles from './styles.module.css';

const Ticker: React.FC = () => {
    const tickers = Array.from({ length: 6 });
    return (
        <div className={styles['ticker-bar']}>
            <div className={styles['ticker-inner']}>
                {tickers.map((_, index) => {
                    return (
                        <div key={index} className={styles['ticker-item']}>
                            <span>
                                🏁 k1netic finished with 132 WPM — room Morning
                                Grind
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { Ticker };
