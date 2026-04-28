import { HeaderVariants } from '~/libs/enums/enums.js';
import {
    useAppSelector,
    useAppDispatch,
    useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as gameActions } from '~/features/game/game.js';
import { actions as userActions } from '~/features/users/user.js';
import {
    Ticker,
    Rooms,
    Createroom,
    JoinPanel,
    TopPlayers,
    UserMenu,
} from './components/components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import { Header, Hero, Stats, Footer } from '~/libs/components/components.js';
import styles from './styles.module.css';

const Lobby: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { rooms, currentRoom, games } = useAppSelector((state) => state.game);
    const { users } = useAppSelector((state) => state.users);

    useEffect(() => {
        void dispatch(gameActions.getAllGames());
        void dispatch(userActions.getAllUsers());
    }, [dispatch]);

    const mainContentClasses = getClassNames(styles['main'], 'grid');

    return (
        <>
            <Ticker games={games} />
            <Header variant={HeaderVariants.SHRUNK}>
                <UserMenu users={users} user={user} />
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
                    <Rooms rooms={rooms} user={user} />
                    <Createroom currentRoom={currentRoom} user={user} />
                    <JoinPanel rooms={rooms} />
                    <TopPlayers games={games} />
                </main>
                <Footer />
            </div>
        </>
    );
};

export { Lobby };
