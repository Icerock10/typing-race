import { getClassNames } from '~/libs/helpers/helpers.js';
import { type PlayerDto } from 'shared';
import { Cluster, Avatar } from '~/libs/components/components.js';
import styles from './styles.module.css';

type Properties = {
    player: PlayerDto;
};

const LobbyPlayer: React.FC<Properties> = ({
    player: { isReady, userName },
}) => {
    return (
        <Cluster
            className={getClassNames(
                styles['player-row'],
                isReady && styles['ready'],
            )}
        >
            <Avatar name={userName} />
            <div className={styles['row-name']}>{userName}</div>
            <Cluster
                className={getClassNames(
                    styles['row-status'],
                    isReady ? styles['ready'] : styles['not-ready'],
                )}
            >
                <div className="live-dot" />
                {isReady ? 'Ready' : 'Not Ready'}
            </Cluster>
        </Cluster>
    );
};

export { LobbyPlayer };
