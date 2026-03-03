import {
    AppRoute,
    ButtonLabels,
    ButtonSizes,
    ButtonVariants,
    HeaderVariants,
} from '~/libs/enums/enums.js';
import {
    Ticker,
    Rooms,
    Createroom,
    JoinPanel,
    LeaderBoardPanel,
} from './components/components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import {
    Header,
    Cluster,
    Hero,
    Stats,
    Footer,
    Link,
} from '~/libs/components/components.js';
import styles from './styles.module.css';

const Lobby: React.FC = () => {
    const mainContentClasses = getClassNames(styles['main'], 'grid');
    return (
        <>
            <Ticker />
            <Header variant={HeaderVariants.SHRUNK}>
                <Cluster>
                    <Cluster className={styles['user-badge']}>
                        <div className="live-dot" />
                        <span>1,204 online</span>
                    </Cluster>
                    <Link
                        to={AppRoute.AUTH}
                        asButtonVariant={ButtonVariants.SECONDARY}
                        asButtonSize={ButtonSizes.FIT}
                    >
                        {ButtonLabels.SIGN_IN}
                    </Link>
                    <Link
                        to={AppRoute.AUTH}
                        asButtonVariant={ButtonVariants.PRIMARY}
                        className={styles['header-link']}
                        asButtonSize={ButtonSizes.FIT}
                    >
                        {ButtonLabels.REGISTER}
                    </Link>
                </Cluster>
            </Header>
            <div className="container">
                <Hero
                    isLobbyPage
                    label="Live rooms open now"
                    title={
                        <>
                            Race to the{' '}
                            <span className="highlight">finish line</span> —
                            word by word.
                        </>
                    }
                    subtitle="Join a room, type as fast as you can, and beat your rivals in real-time typing battles."
                />
                <Stats />
                <main className={mainContentClasses}>
                    <Rooms />
                    <Createroom />
                    <JoinPanel />
                    <LeaderBoardPanel />
                </main>
                <Footer />
            </div>
        </>
    );
};

export { Lobby };
