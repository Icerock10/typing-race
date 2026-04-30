import { Cluster, Button } from '~/libs/components/components.js';
import { Room } from './components/components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import { actions as lobbyActions } from '~/features/game/slices/game.js';
import { PlusIcon } from '~/assets/image/image.js';
import {
    ButtonVariants,
    ButtonLabels,
    ButtonSizes,
} from '~/libs/enums/enums.js';
import styles from './styles.module.css';
import { useCallback, useAppDispatch } from '~/libs/hooks/hooks.js';
import { type RoomResponseDto, type UserDto } from '~/libs/types/types.js';

const DEFAULT_EMPTY_ROOMS_VALUE = 0;

type Properties = {
    user: UserDto | null;
    rooms: RoomResponseDto[];
};

const Rooms: React.FC<Properties> = ({ user, rooms }) => {
    const dispatch = useAppDispatch();

    const handleRefreshRoom = useCallback(() => {
        dispatch(lobbyActions.refreshRoom());
    }, [dispatch]);

    const roomTitleClasses = getClassNames(styles['rooms-title'], 'with-dash');
    return (
        <div className={styles['rooms']}>
            <Cluster className={styles['rooms-header']}>
                <Cluster className={roomTitleClasses}>Open rooms</Cluster>
                <Button
                    variant={ButtonVariants.SECONDARY}
                    size={ButtonSizes.FIT}
                    label={ButtonLabels.REFRESH}
                    onClick={handleRefreshRoom}
                />
            </Cluster>
            {rooms.length > DEFAULT_EMPTY_ROOMS_VALUE ? (
                rooms.map((room) => (
                    <Room key={room.roomId} user={user} room={room} />
                ))
            ) : (
                <Cluster className={styles['placeholder']}>
                    <PlusIcon />
                    <h2 className={styles['placeholder-title']}>
                        No open rooms
                    </h2>
                    <p className={styles['placeholder-subtitle']}>
                        There are no active rooms right now. Create one and
                        invite others to race!
                    </p>
                </Cluster>
            )}
        </div>
    );
};

export { Rooms };
