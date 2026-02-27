import { Header, Cluster, Button } from '~/libs/components/components.js';
import { RaceProgress } from './components/components.js';
import styles from './styles.module.css';
import {
    ButtonLabels,
    ButtonSizes,
    HeaderVariants,
    ButtonVariants,
    ClusterVariant,
} from '~/libs/enums/enums.js';

const Race: React.FC = () => {
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
                    <Cluster className={styles['user-avatar']}>
                        <div className="me-avatar">⚡</div>
                        voxel_
                    </Cluster>
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
                    <section className={styles['race-typing']}>
                        Typing section
                    </section>
                    <section className={styles['race-leaderboard']}>
                        LeaderBoard
                    </section>
                    <section className={styles['section-chat']}>
                        Chat Section
                    </section>
                </Cluster>
            </main>
        </>
    );
};

export { Race };
