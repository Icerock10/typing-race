import { type UserDto, type RoomResponseDto } from '~/libs/types/types.js';
import { Cluster, Button, Avatar } from '~/libs/components/components.js';
import {
    useAppDispatch,
    useCallback,
    useNavigate,
} from '~/libs/hooks/hooks.js';
import { actions as lobbyActions } from '~/features/game/slices/game.js';
import {
    ButtonVariants,
    ButtonLabels,
    ClusterVariant,
    ButtonSizes,
    AppRoute,
} from '~/libs/enums/enums.js';
import styles from './styles.module.css';

type Properties = {
    room: RoomResponseDto;
    user: UserDto | null;
};

const Room: React.FC<Properties> = ({ room, user }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleRoomJoin = useCallback(() => {
        const { roomId } = room;
        if (!roomId) {
            return;
        }
        dispatch(lobbyActions.joinRoom({ roomId }));
        void navigate(`${AppRoute.RACE_BASE}${roomId}`);
    }, [dispatch, room, navigate]);

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
                    {room.players.map((player) => (
                        <Avatar key={player.id} name={player.userName} />
                    ))}

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
                    <time className={styles['time']}>Starts in 0</time>
                </Cluster>
                <Button
                    size={ButtonSizes.FIT}
                    variant={ButtonVariants.SECONDARY}
                    label={user ? ButtonLabels.JOIN : ButtonLabels.SPECTATE}
                    onClick={handleRoomJoin}
                    className={styles['room-action']}
                />
            </Cluster>
        </>
    );
};

export { Room };
