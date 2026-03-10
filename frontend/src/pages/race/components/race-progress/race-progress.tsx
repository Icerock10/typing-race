import {
    ButtonLabels,
    ButtonVariants,
    ClusterVariant,
} from '~/libs/enums/enums.js';
import { SectionHeader } from '../section-header/section-header.js';
import styles from './styles.module.css';
import { useAppDispatch, useCallback, useState } from '~/libs/hooks/hooks.js';
import { Cluster, Avatar, Button } from '~/libs/components/components.js';
import { type UserDto, type RoomResponseDto } from '~/libs/types/types.js';
import { actions as raceActions } from '~/features/game/slices/game.js';

type Properties = {
    currentRoom?: RoomResponseDto;
    user: UserDto | null;
    isRaceStarted: boolean;
};

const RaceProgress: React.FC<Properties> = ({
    currentRoom,
    user,
    isRaceStarted,
}) => {
    const dispatch = useAppDispatch();
    const [isReady, setIsReady] = useState(false);
    const userId = user?.id;

    const handleReadyClick = useCallback(() => {
        setIsReady((previous) => {
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
        <section className={styles['race-progress']}>
            <Cluster className={styles['track-header']}>
                <SectionHeader>
                    <span>Race progress</span>
                </SectionHeader>
                <span className={styles['players-count']}>
                    <span>{currentRoom?.players.length}</span>
                    <span>
                        {' / '}
                        {currentRoom?.maxPlayers} players
                    </span>
                </span>
            </Cluster>
            <div className={styles['tracks']}>
                {currentRoom?.players.map((player) => {
                    const me = userId === player.id;
                    return (
                        <Cluster
                            key={player.id}
                            cluster={ClusterVariant.GRID}
                            className={styles['player-track']}
                        >
                            <span className={styles['player-position']} />
                            <Cluster className={styles['player-info']}>
                                <Avatar name={player.userName} />
                                <span className={styles['player-name']}>
                                    {me && <span>(you) </span>}
                                    {player.userName}
                                </span>
                            </Cluster>
                            <div className={styles['track-bar-wrap']}>
                                <div className={styles['track-bar-fill']} />
                            </div>

                            {!isRaceStarted && (
                                <>
                                    {me ? (
                                        <Button
                                            label={
                                                isReady
                                                    ? ButtonLabels.READY
                                                    : ButtonLabels.NOT_READY
                                            }
                                            variant={ButtonVariants.SECONDARY}
                                            onClick={handleReadyClick}
                                        />
                                    ) : (
                                        <span>
                                            {player.isReady
                                                ? ButtonLabels.READY
                                                : ButtonLabels.NOT_READY}
                                        </span>
                                    )}
                                </>
                            )}
                        </Cluster>
                    );
                })}
            </div>
        </section>
    );
};

export { RaceProgress };
