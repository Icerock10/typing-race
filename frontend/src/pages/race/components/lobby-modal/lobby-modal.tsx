import styles from './styles.module.css';
import { Modal, Cluster, Button } from '~/libs/components/components.js';
import { RocketIcon } from '~/assets/image/image.js';
import {
    useRef,
    useCallback,
    useAppDispatch,
    useCountDown,
} from '~/libs/hooks/hooks.js';
import { actions as raceActions } from '~/features/game/slices/game.js';
import { type RoomResponseDto } from '~/libs/types/types.js';

import { ButtonLabels, ButtonVariants } from '~/libs/enums/enums.js';
import { LobbyPlayer } from '../player/player.js';

type Properties = {
    currentRoom?: RoomResponseDto;
    isCountDownStarted: boolean;
    shouldOpen: boolean;
    currentUserId?: string;
    guest: boolean;
};

const LobbyModal: React.FC<Properties> = ({
    currentRoom,
    isCountDownStarted,
    shouldOpen,
    currentUserId,
    guest,
}) => {
    const modalReference = useRef(null);
    const dispatch = useAppDispatch();

    const isPlayerReady =
        currentRoom?.players.find((player) => player.id === currentUserId)
            ?.isReady ?? false;

    const { countDown } = useCountDown({
        trigger: isCountDownStarted,
        initialValue: 5000,
    });
    const readyStatusText = isPlayerReady
        ? ButtonLabels.NOT_READY
        : ButtonLabels.READY;

    const handleReadyClick = useCallback(() => {
        dispatch(
            raceActions.setReadyStatus({
                roomId: String(currentRoom?.roomId),
                isReady: !isPlayerReady,
            }),
        );
    }, [currentRoom?.roomId, dispatch, isPlayerReady]);

    if (!currentRoom) {
        return null;
    }

    return (
        <Modal isOpen={shouldOpen} modalReference={modalReference}>
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
                            {currentRoom.roomName} 🔥
                        </span>
                        {' · '}
                        <span>
                            {currentRoom.players.length}/
                            {currentRoom.maxPlayers} players
                        </span>
                    </div>
                </Cluster>
                <Cluster className={styles['card-players']}>
                    {currentRoom.players.map((player) => (
                        <LobbyPlayer key={player.id} player={player} />
                    ))}
                </Cluster>
                <div className={styles['card-actions']}>
                    {!guest && (
                        <Button
                            className={styles['actions-ready-button']}
                            label={readyStatusText}
                            variant={ButtonVariants.PRIMARY}
                            onClick={handleReadyClick}
                            isDisabled={isCountDownStarted}
                        />
                    )}
                    <p className={styles['actions-hint']}>
                        Game starts when all players are ready
                    </p>
                </div>
            </Cluster>
        </Modal>
    );
};

export { LobbyModal };
