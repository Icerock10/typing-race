import styles from './styles.module.css';
import { useEffect, useState, useRef } from '~/libs/hooks/hooks.js';
import { mockApi } from '~/libs/modules/api/api.js';
import { Cluster } from '~/libs/components/components.js';
import { ClusterVariant } from '~/libs/enums/enums.js';

const typedText = ['jumps', 'over', 'the'];
const initialText = 'The quick brown fox';
const OFFSET = 1;
const INDEX_REFERENCE_VALUE = 0;

const RacePreview: React.FC = () => {
    const [text, setText] = useState<string>(initialText);
    const indexReference = useRef<number>(INDEX_REFERENCE_VALUE);

    useEffect(() => {
        const delay = 2000;

        const interval = setInterval(() => {
            if (indexReference.current < typedText.length) {
                const currentIndex = indexReference.current;
                setText(
                    (previous) =>
                        `${previous} ${typedText[currentIndex] as string}`,
                );

                indexReference.current = currentIndex + OFFSET;
            } else {
                setText(initialText);
                indexReference.current = 0;
            }
        }, delay);

        return (): void => {
            clearInterval(interval);
        };
    }, []);

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
                {mockApi.racersPreview.map((racer, index) => {
                    return (
                        <div
                            className="flex-cluster"
                            data-rank={index + OFFSET}
                            key={racer.name}
                        >
                            <Cluster
                                cluster={ClusterVariant.FLEX}
                                className={styles['racer-avatar']}
                            >
                                {racer.avatar}
                            </Cluster>
                            <span className={styles['racer-name']}>
                                {racer.name}
                            </span>
                            <div className={styles['racer-progress']}>
                                <div
                                    className={styles['racer-progress-fill']}
                                />
                            </div>
                            <span
                                className={styles['racer-wpm']}
                            >{`${String(racer.wpm)} wpm`}</span>
                        </div>
                    );
                })}
            </Cluster>
        </div>
    );
};

export { RacePreview };
