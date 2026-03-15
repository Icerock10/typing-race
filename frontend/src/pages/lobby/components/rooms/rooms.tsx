import { Cluster, Button } from '~/libs/components/components.js';
import { Room } from './components/components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import { actions as lobbyActions } from '~/features/game/slices/game.js';
import {
    ButtonVariants,
    ButtonLabels,
    ButtonSizes,
} from '~/libs/enums/enums.js';
import styles from './styles.module.css';
import { useCallback, useAppDispatch } from '~/libs/hooks/hooks.js';
import { type RoomResponseDto, type UserDto } from '~/libs/types/types.js';

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
            {rooms.map((room) => (
                <Room key={room.roomId} user={user} room={room} />
            ))}
        </div>
    );
};

export { Rooms };
