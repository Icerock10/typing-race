import { Cluster, Button, Avatar } from '~/libs/components/components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import { mockApi } from '~/libs/modules/api/api.js';
import {
    ButtonVariants,
    ButtonLabels,
    ClusterVariant,
    ButtonSizes,
} from '~/libs/enums/enums.js';
import styles from './styles.module.css';

const Rooms: React.FC = () => {
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
            {mockApi.racersPreview.map((racer, index) => {
                return (
                    <Cluster
                        key={index}
                        cluster={ClusterVariant.GRID}
                        className={styles['room']}
                    >
                        <Cluster className={styles['room-info']}>
                            <div className={styles['room-name']}>
                                Speed Demons 🔥
                            </div>
                            <span className={styles['status']}>
                                In progress
                            </span>
                        </Cluster>
                        <Cluster className={styles['room-players']}>
                            <Avatar name={racer.name} />

                            <span className={styles['player-count']}>4/6</span>
                        </Cluster>
                        <Cluster className={styles['room-meta']}>
                            <div className={styles['lang']}>English ·</div>
                            <div className={styles['dificulty']}>Easy ·</div>
                            <time className={styles['time']}>
                                Starts in 0:18
                            </time>
                        </Cluster>
                        <Button
                            size={ButtonSizes.FIT}
                            variant={ButtonVariants.SECONDARY}
                            label={ButtonLabels.SPECTATE}
                            className={styles['room-action']}
                        />
                    </Cluster>
                );
            })}
        </div>
    );
};

export { Rooms };
