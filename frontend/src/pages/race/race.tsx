import {
    Header,
    Cluster,
    Button,
    Avatar,
} from '~/libs/components/components.js';
import { LinkIcon } from '~/assets/image/image.js';
import {
    RaceProgress,
    Typing,
    Chat,
    Leaderboard,
} from './components/components.js';
import styles from './styles.module.css';
import { actions as lobbyActions } from '../../features/lobby/slices/lobby.js';
import { notifications } from '../../features/notifications/notificationts.js';
import {
    ButtonLabels,
    ButtonSizes,
    HeaderVariants,
    ButtonVariants,
    ClusterVariant,
    AvatarVariants,
    AppRoute,
    SuccessMessage,
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
    const { user } = useAppSelector((state) => state.auth);
    const { rooms } = useAppSelector((state) => state.lobby);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { roomId } = useParams() as { roomId: string };

    const currentRoom = rooms.find((room) => room.roomId === roomId);

    const handleLeaveRoom = useCallback(() => {
        void navigate(AppRoute.LOBBY);
    }, [navigate]);

    const handleInviteClick = useCallback(() => {
        void navigator.clipboard.writeText(roomId);
        void notifications.info(SuccessMessage.CODE_COPIED);
    }, [roomId]);

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
                    <Button
                        size={ButtonSizes.FIT}
                        variant={ButtonVariants.SECONDARY}
                        label={ButtonLabels.INVITE}
                        className={styles['invite-button']}
                        icon={<LinkIcon />}
                        onClick={handleInviteClick}
                    />
                </Cluster>
                <Cluster className={styles['user-panel']}>
                    <div className={styles['timer-display']}>0:00</div>
                    <Avatar
                        name={user?.userName}
                        variant={AvatarVariants.FULL}
                        avatarUrl={user?.avatarUrl}
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
