import styles from './styles.module.css';
import { Modal, Cluster, Button } from '~/libs/components/components.js';
import { RocketIcon } from '~/assets/image/image.js';
import {
    useRef,
    useState,
    useCallback,
    useAppDispatch,
    useCountDown,
} from '~/libs/hooks/hooks.js';
import { actions as raceActions } from '~/features/game/slices/game.js';
import { type RoomResponseDto } from '~/libs/types/types.js';

import { ButtonLabels, ButtonVariants } from '~/libs/enums/enums.js';
import { Player } from '../player/player.js';

type Properties = {
    currentRoom?: RoomResponseDto;
    isCountDownStarted: boolean;
    isRaceStarted: boolean;
};

const LobbyModal: React.FC<Properties> = ({
    currentRoom,
    isCountDownStarted,
    isRaceStarted,
}) => {
    const modalReference = useRef(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const dispatch = useAppDispatch();

    const { countDown } = useCountDown({
        trigger: isCountDownStarted,
        initialValue: 5,
    });
    const readyStatusText = isPlayerReady
        ? ButtonLabels.NOT_READY
        : ButtonLabels.READY;

    const handleReadyClick = useCallback(() => {
        setIsPlayerReady((previous) => {
            const updatedReadyState = !previous;
            dispatch(
                raceActions.setReadyStatus({
                    roomId: String(currentRoom?.roomId),
                    isReady: updatedReadyState,
                }),
            );

            return updatedReadyState;
        });
    }, [currentRoom?.roomId, dispatch]);

    return (
        <Modal isOpen={!isRaceStarted} modalReference={modalReference}>
            <Cluster className={styles['lobby-card-wrapper']}>
                <Cluster className="card-header">
                    <div className={styles['card-header-icon']}>
                        <RocketIcon />
                    </div>
                    <h2 className={styles['card-header-title']}>
                        {isCountDownStarted ? (
                            <>
                                <span>Game Starts in...</span>
                                {'  '}
                                <span
                                    className={styles['card-header-countdown']}
                                >
                                    {countDown}
                                </span>
                            </>
                        ) : (
                            'Waiting for players...'
                        )}
                    </h2>
                    <div className={styles['card-header-subtitle']}>
                        <span>Room</span>
                        {' · '}
                        <span className={styles['subtitle-room-name']}>
                            {currentRoom?.roomName} 🔥
                        </span>
                        {' · '}
                        <span>
                            {currentRoom?.players.length}/
                            {currentRoom?.maxPlayers} players
                        </span>
                    </div>
                </Cluster>
                <Cluster className={styles['card-players']}>
                    {currentRoom?.players.map((player) => (
                        <Player key={player.id} player={player} />
                    ))}
                </Cluster>
                <div className={styles['card-actions']}>
                    <Button
                        className={styles['actions-ready-button']}
                        label={readyStatusText}
                        variant={ButtonVariants.PRIMARY}
                        onClick={handleReadyClick}
                        isDisabled={isCountDownStarted}
                    />
                    <p className={styles['actions-hint']}>
                        Game starts when all players are ready
                    </p>
                </div>
            </Cluster>
        </Modal>
    );
};

export { LobbyModal };
