import {
    Header,
    Cluster,
    Button,
    Avatar,
} from '~/libs/components/components.js';
import {
    RaceProgress,
    Typing,
    Chat,
    Leaderboard,
} from './components/components.js';
import styles from './styles.module.css';
import { actions as lobbyActions } from '../../features/lobby/slices/lobby.js';
import {
    ButtonLabels,
    ButtonSizes,
    HeaderVariants,
    ButtonVariants,
    ClusterVariant,
    AvatarVariants,
    AppRoute,
} from '~/libs/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useParams,
    useNavigate,
    useEffect,
} from '~/libs/hooks/hooks.js';

const Race: React.FC = () => {
    const {
        auth: { user },
        lobby: { rooms },
    } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { roomId } = useParams() as { roomId: string };

    const currentRoom = rooms.find((room) => room.roomId === roomId);

    const handleLeaveRoom = useCallback(() => {
        void navigate(AppRoute.LOBBY);
    }, [navigate]);

    useEffect(() => {
        return (): void => {
            void dispatch(lobbyActions.leaveRoom({ roomId }));
        };
    }, [dispatch, roomId]);

    return (
        <>
            <Header variant={HeaderVariants.COMPACT}>
                <Cluster className={styles['header-room-info']}>
                    <strong className={styles['room-name']}>
                        {currentRoom?.roomName} 🔥
                    </strong>
                    <span className={styles['room-lang']}>
                        {currentRoom?.language} ·{' '}
                    </span>
                    <span className={styles['room-dificulty']}>
                        {currentRoom?.difficulty} ·{' '}
                    </span>
                    <span className={styles['room-players']}>
                        {currentRoom?.players.length} players
                    </span>
                    <Cluster className={styles['room-live']}>
                        <div className="live-dot" />
                        <span>{currentRoom?.status}</span>
                    </Cluster>
                </Cluster>
                <Cluster className={styles['user-panel']}>
                    <div className={styles['timer-display']}>0:00</div>
                    <Avatar
                        name={user?.userName}
                        variant={AvatarVariants.FULL}
                    />
                    <Button
                        size={ButtonSizes.FIT}
                        label={ButtonLabels.LEAVE_ROOM}
                        variant={ButtonVariants.SECONDARY}
                        className={styles['leave-button']}
                        onClick={handleLeaveRoom}
                    />
                </Cluster>
            </Header>
            <main className="container">
                <Cluster
                    cluster={ClusterVariant.GRID}
                    className={styles['race']}
                >
                    <RaceProgress />
                    <Typing />
                    <Leaderboard />
                    <Chat />
                </Cluster>
            </main>
        </>
    );
};

export { Race };
