import { type RoomResponseDto } from '~/libs/types/types.js';
import { Cluster, Button, Avatar } from '~/libs/components/components.js';
import {
    ButtonVariants,
    ButtonLabels,
    ClusterVariant,
    ButtonSizes,
} from '~/libs/enums/enums.js';
import styles from './styles.module.css';

type Properties = {
    room: RoomResponseDto;
};

const Room: React.FC<Properties> = ({ room }) => {
    return (
        <>
            <Cluster
                key={room.roomId}
                cluster={ClusterVariant.GRID}
                className={styles['room']}
            >
                <Cluster className={styles['room-info']}>
                    <div className={styles['room-name']}>
                        {room.roomName} 🔥
                    </div>
                    <span className={styles['status']}>{room.status}</span>
                </Cluster>
                <Cluster className={styles['room-players']}>
                    <Avatar name="G" />

                    <span className={styles['player-count']}>
                        {room.players.length}
                        {`/${room.maxPlayers}`}
                    </span>
                </Cluster>
                <Cluster className={styles['room-meta']}>
                    <div className={styles['lang']}>{room.language} ·</div>
                    <div className={styles['dificulty']}>
                        {room.difficulty} ·
                    </div>
                    <time className={styles['time']}>
                        Starts in {room.countdown ?? '0'}
                    </time>
                </Cluster>
                <Button
                    size={ButtonSizes.FIT}
                    variant={ButtonVariants.SECONDARY}
                    label={ButtonLabels.SPECTATE}
                    className={styles['room-action']}
                />
            </Cluster>
        </>
    );
};

export { Room };
