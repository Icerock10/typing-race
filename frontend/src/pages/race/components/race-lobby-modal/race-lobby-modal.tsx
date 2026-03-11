import styles from './styles.module.css';
import {
    Modal,
    Cluster,
    Button,
    Avatar,
} from '~/libs/components/components.js';
import RocketIcon from './rocket.svg?react';
import {
    useRef,
    useState,
    useCallback,
    useAppDispatch,
} from '~/libs/hooks/hooks.js';
import { actions as raceActions } from '~/features/game/slices/game.js';
import { type RoomResponseDto } from '~/libs/types/types.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import { ButtonLabels, ButtonVariants } from '~/libs/enums/enums.js';

type Properties = {
    currentRoom?: RoomResponseDto;
};

const RaceLobbyModal: React.FC<Properties> = ({ currentRoom }) => {
    const modalReference = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const dispatch = useAppDispatch();
    const onModalClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

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
        <Modal
            onClose={onModalClose}
            isOpen={isModalOpen}
            modalReference={modalReference}
        >
            <Cluster className={styles['lobby-card-wrapper']}>
                <Cluster className="card-header">
                    <div className={styles['card-header-icon']}>
                        <RocketIcon />
                    </div>
                    <h2 className={styles['card-header-title']}>
                        Waiting for players…
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
                    {currentRoom?.players.map(({ id, userName, isReady }) => (
                        <Cluster
                            key={id}
                            className={getClassNames(
                                styles['player-row'],
                                isReady && styles['ready'],
                            )}
                        >
                            <Avatar name={userName} />
                            <div className={styles['row-name']}>{userName}</div>
                            <Cluster
                                className={getClassNames(
                                    styles['row-status'],
                                    isReady
                                        ? styles['ready']
                                        : styles['not-ready'],
                                )}
                            >
                                <div className="live-dot" />
                                {isReady ? 'Ready' : 'Not Ready'}
                            </Cluster>
                        </Cluster>
                    ))}
                </Cluster>
                <div className={styles['card-actions']}>
                    <Button
                        className={styles['actions-ready-button']}
                        label={readyStatusText}
                        variant={ButtonVariants.PRIMARY}
                        onClick={handleReadyClick}
                    />
                    <p className={styles['actions-hint']}>
                        Game starts when all players are ready
                    </p>
                </div>
            </Cluster>
        </Modal>
    );
};

export { RaceLobbyModal };
