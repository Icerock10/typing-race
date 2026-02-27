import { ClusterVariant } from '~/libs/enums/enums.js';
import { SectionHeader } from '../section-header/section-header.js';
import { mockApi } from '~/libs/modules/api/api.js';
import styles from './styles.module.css';
import { Cluster, Avatar } from '~/libs/components/components.js';

const RaceProgress: React.FC = () => {
    return (
        <section className={styles['race-progress']}>
            <Cluster className={styles['track-header']}>
                <SectionHeader>
                    <span>Race progress</span>
                </SectionHeader>
                <span className={styles['players-count']}>4 / 4 players</span>
            </Cluster>
            <div className={styles['tracks']}>
                {mockApi.tickers.map((_, index) => {
                    return (
                        <Cluster
                            key={index}
                            cluster={ClusterVariant.GRID}
                            className={styles['player-track']}
                        >
                            <span className={styles['player-position']}>
                                🥇
                            </span>
                            <Cluster className={styles['player-info']}>
                                <Avatar name="K" />
                                <span className={styles['player-name']}>
                                    k1netic
                                </span>
                            </Cluster>
                            <div className={styles['track-bar-wrap']}>
                                <div className={styles['track-bar-fill']} />
                            </div>
                            <span className={styles['player-wpm']}>
                                148 wpm
                            </span>
                        </Cluster>
                    );
                })}
            </div>
        </section>
    );
};

export { RaceProgress };
