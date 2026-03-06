import styles from './styles.module.css';
import { useTyping } from '~/libs/hooks/hooks.js';
import { mockApi } from '~/libs/modules/api/api.js';
import { Cluster } from '~/libs/components/components.js';
import { Racer } from '../racer/racer.js';
import { ClusterVariant } from '~/libs/enums/enums.js';

const OFFSET = 1;
const WORDS = ['jumps', 'over', 'the'];
const initialText = 'The quick brown fox';

const RacePreview: React.FC = () => {
    const { text } = useTyping({ words: WORDS, initialText });

    return (
        <div className={styles['race-preview']}>
            <Cluster
                cluster={ClusterVariant.FLEX}
                className={styles['race-header']}
            >
                <span className={styles['race-title']}>
                    Room: Speed Demons 🔥
                </span>
                <div className={styles['race-live']}>
                    <div className="live-dot" /> Live
                </div>
            </Cluster>
            <div className={styles['race-text']}>
                <span className={styles['typed']}>{text}</span>
                <span className={styles['cursor']} />{' '}
                <span>
                    jumps over the lazy dog near the riverbank at dawn.&quot;
                </span>
            </div>
            <Cluster cluster={ClusterVariant.GRID} className={styles['racers']}>
                {mockApi.racersPreview.map((racer, index) => (
                    <Racer
                        key={racer.name}
                        racer={racer}
                        rank={index + OFFSET}
                    />
                ))}
            </Cluster>
        </div>
    );
};

export { RacePreview };
