import { Avatar } from '~/libs/components/components.js';
import styles from './styles.module.css';

type TRacer = {
    name: string;
    wpm: number;
    isFinished: boolean;
};

type Properties = {
    rank: number;
    racer: TRacer;
};

const Racer: React.FC<Properties> = ({ rank, racer }) => {
    return (
        <div className="flex-cluster" data-rank={rank}>
            <Avatar name={racer.name} />
            <span className={styles['racer-name']}>{racer.name}</span>
            <div className={styles['racer-progress']}>
                <div className={styles['racer-progress-fill']} />
            </div>
            <span
                className={styles['racer-wpm']}
            >{`${String(racer.wpm)} wpm`}</span>
        </div>
    );
};

export { Racer };
