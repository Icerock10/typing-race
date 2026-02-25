import styles from './styles.module.css';
import { mockApi } from '~/libs/modules/api/api.js';

const Ticker: React.FC = () => {
    return (
        <div className={styles['ticker-bar']}>
            <div className={styles['ticker-inner']}>
                {mockApi.tickers.map((_, index) => {
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
