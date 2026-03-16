import { type UserDto, type RoomResponseDto } from '~/libs/types/types.js';
import { Cluster, Button, Avatar } from '~/libs/components/components.js';
import { formatDuration } from '~/libs/helpers/helpers.js';
import {
    useAppDispatch,
    useCallback,
    useNavigate,
    useCountDown,
    useAppSelector,
} from '~/libs/hooks/hooks.js';
import { actions as lobbyActions } from '~/features/game/slices/game.js';
import {
    ButtonVariants,
    ButtonLabels,
    ClusterVariant,
    ButtonSizes,
    AppRoute,
    GameStatus,
} from '~/libs/enums/enums.js';
import styles from './styles.module.css';

type Properties = {
    room: RoomResponseDto;
    user: UserDto | null;
};

const MS_IN_SECOND = 1000;
const PREPARE_COUNTDOWN_VALUE = 5000;
const TIME_FOR_GAME_FALLBACK = 0;

const Room: React.FC<Properties> = ({ room, user }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isCountDownStarted } = useAppSelector((state) => state.game.race);
    const handleRoomJoin = useCallback(() => {
        const { roomId } = room;
        if (!roomId) {
            return;
        }
        dispatch(lobbyActions.joinRoom({ roomId }));
        void navigate(`${AppRoute.RACE_BASE}${roomId}`);
    }, [dispatch, room, navigate]);

    const { countDown: prepareCountDown } = useCountDown({
        trigger: isCountDownStarted,
        initialValue: PREPARE_COUNTDOWN_VALUE,
    });
    const { countDown: gameCountDown } = useCountDown({
        trigger: room.status === GameStatus.IN_GAME,
        initialValue: room.timeForGame ?? TIME_FOR_GAME_FALLBACK,
    });

    const getRoomStatus = (): React.ReactNode => {
        if (isCountDownStarted) {
            return (
                <div>
                    Starts in{' '}
                    <span>
                        {formatDuration(prepareCountDown * MS_IN_SECOND)}
                    </span>
                </div>
            );
        }
        if (room.status === GameStatus.IN_GAME) {
            return (
                <span>{formatDuration(gameCountDown * MS_IN_SECOND)} left</span>
            );
        }
        if (room.status === GameStatus.FINISHED) {
            return <span>Game finished</span>;
        }
        return <span>In progress</span>;
    };

    return (
        <Cluster cluster={ClusterVariant.GRID} className={styles['room']}>
            <Cluster className={styles['room-info']}>
                <div className={styles['room-name']}>{room.roomName} 🔥</div>
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
                <div className={styles['dificulty']}>{room.difficulty} ·</div>
                <time className={styles['time']}>{getRoomStatus()}</time>
            </Cluster>
            <Button
                size={ButtonSizes.FIT}
                variant={ButtonVariants.SECONDARY}
                label={user ? ButtonLabels.JOIN : ButtonLabels.SPECTATE}
                onClick={handleRoomJoin}
                className={styles['room-action']}
            />
        </Cluster>
    );
};

export { Room };
