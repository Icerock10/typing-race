import {
    ButtonLabels,
    ButtonSizes,
    ButtonVariants,
    HeaderVariants,
} from '~/libs/enums/enums.js';
import { Ticker, Rooms, Createroom } from './components/components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import {
    Header,
    Button,
    Cluster,
    Hero,
    Stats,
    Footer,
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
                    <Button
                        variant={ButtonVariants.SECONDARY}
                        size={ButtonSizes.FIT}
                        label={ButtonLabels.SIGN_IN}
                    />
                    <Button
                        size={ButtonSizes.FIT}
                        variant={ButtonVariants.PRIMARY}
                        className={styles['button-register']}
                        label={ButtonLabels.REGISTER}
                    />
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
                </main>
                <Footer />
            </div>
        </>
    );
};

export { Lobby };
