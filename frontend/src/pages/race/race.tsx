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
import {
    ButtonLabels,
    ButtonSizes,
    HeaderVariants,
    ButtonVariants,
    ClusterVariant,
    AvatarVariants,
} from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

const Race: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <>
            <Header variant={HeaderVariants.COMPACT}>
                <Cluster className={styles['header-room-info']}>
                    <strong className={styles['room-name']}>
                        Speed Demons 🔥
                    </strong>
                    <span className={styles['room-lang']}>English · </span>
                    <span className={styles['room-dificulty']}>Medium · </span>
                    <span className={styles['room-players']}>4 players</span>
                    <Cluster className={styles['room-live']}>
                        <div className="live-dot" />
                        <span>Live</span>
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
