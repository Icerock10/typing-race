import { ClusterVariant } from '~/libs/enums/enums.js';
import { type PlayerDto } from 'shared';
import { Cluster, Avatar } from '~/libs/components/components.js';
import styles from './styles.module.css';

type Properties = {
    player: PlayerDto;
};

const ProgressPlayer: React.FC<Properties> = ({ player }) => {
    return (
        <Cluster
            cluster={ClusterVariant.GRID}
            className={styles['player-track']}
        >
            <span className={styles['player-position']} />
            <Cluster className={styles['player-info']}>
                <Avatar name={player.userName} />
                <span className={styles['player-name']}>{player.userName}</span>
            </Cluster>
            <div className={styles['track-bar-wrap']}>
                <div
                    style={{
                        width: `${String(player.progress)}%`,
                    }}
                    className={styles['track-bar-fill']}
                />
            </div>
            <span className={styles['track-wpm']}>{player.wpm} wpm</span>
        </Cluster>
    );
};

export { ProgressPlayer };
