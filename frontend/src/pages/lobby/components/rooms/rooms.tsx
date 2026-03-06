import { Cluster, Button } from '~/libs/components/components.js';
import { Room } from './components/components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import {
    ButtonVariants,
    ButtonLabels,
    ButtonSizes,
} from '~/libs/enums/enums.js';
import styles from './styles.module.css';
import { useAppSelector } from '~/libs/hooks/hooks.js';

const Rooms: React.FC = () => {
    const { rooms } = useAppSelector((state) => state.lobby);

    const roomTitleClasses = getClassNames(styles['rooms-title'], 'with-dash');
    return (
        <div className={styles['rooms']}>
            <Cluster className={styles['rooms-header']}>
                <Cluster className={roomTitleClasses}>Open rooms</Cluster>
                <Button
                    variant={ButtonVariants.SECONDARY}
                    size={ButtonSizes.FIT}
                    label={ButtonLabels.REFRESH}
                />
            </Cluster>
            {rooms.map((room) => (
                <Room key={room.roomId} room={room} />
            ))}
        </div>
    );
};

export { Rooms };
