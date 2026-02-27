import styles from './styles.module.css';
import { Cluster, Avatar } from '~/libs/components/components.js';
import { SectionHeader } from '../section-header/section-header.js';
import { mockApi } from '~/libs/modules/api/api.js';
import { getClassNames } from '~/libs/helpers/helpers.js';

const Leaderboard: React.FC = () => {
    return (
        <section className={styles['race-leaderboard']}>
            <SectionHeader>
                <span>LeaderBoard</span>
            </SectionHeader>
            <div className="leaderboard-list">
                {mockApi.racersPreview.map((racer, index) => {
                    const clusterClasses = getClassNames(
                        styles['list-row'],
                        racer.isFinished && styles['finished'],
                    );
                    return (
                        <Cluster key={index} className={clusterClasses}>
                            <Avatar name={racer.name} />
                            {!racer.isFinished && (
                                <Cluster className={styles['typing-indicator']}>
                                    <span />
                                    <span />
                                    <span />
                                </Cluster>
                            )}

                            <div className={styles['racer-name']}>
                                {racer.name}
                            </div>
                            <div className={styles['racer-percent']}>60%</div>
                        </Cluster>
                    );
                })}
            </div>
        </section>
    );
};

export { Leaderboard };
