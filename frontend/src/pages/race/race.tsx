import {
    Header,
    Cluster,
    Button,
    Avatar,
    Link,
} from '~/libs/components/components.js';
import { LinkIcon } from '~/assets/image/image.js';

import {
    RaceProgress,
    Typing,
    Chat,
    Leaderboard,
} from './components/components.js';
import styles from './styles.module.css';
import { actions as lobbyActions } from '../../features/game/slices/game.js';
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
    const { rooms, isRoomsLoaded, isRaceStarted } = useAppSelector(
        (state) => state.lobby,
    );
    const { roomId } = useParams() as { roomId: string };
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const guest = !user;
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

    useEffect(() => {
        if (isRoomsLoaded && !currentRoom) {
            void navigate(AppRoute.LOBBY);
        }
    }, [currentRoom, navigate, isRoomsLoaded]);

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
                    {!guest && (
                        <Button
                            size={ButtonSizes.FIT}
                            variant={ButtonVariants.SECONDARY}
                            label={ButtonLabels.INVITE}
                            className={styles['invite-button']}
                            icon={<LinkIcon />}
                            onClick={handleInviteClick}
                        />
                    )}
                </Cluster>
                <Cluster className={styles['user-panel']}>
                    <div className={styles['timer-display']}>0:00</div>
                    {guest ? (
                        <Link
                            to={AppRoute.AUTH}
                            asButtonVariant={ButtonVariants.SECONDARY}
                            className={styles['sign-in-link']}
                            asButtonSize={ButtonSizes.FIT}
                        >
                            {ButtonLabels.SIGN_IN}
                        </Link>
                    ) : (
                        <Avatar
                            name={user.userName}
                            variant={AvatarVariants.FULL}
                            avatarUrl={user.avatarUrl}
                        />
                    )}
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
                    <RaceProgress
                        isRaceStarted={isRaceStarted}
                        user={user}
                        currentRoom={currentRoom}
                    />
                    <Typing />
                    <Leaderboard />
                    <Chat />
                </Cluster>
            </main>
        </>
    );
};

export { Race };
