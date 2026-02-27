import { Cluster, Input } from '~/libs/components/components.js';
import { mockApi } from '~/libs/modules/api/api.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm } from '~/libs/hooks/hooks.js';
import styles from './styles.module.css';

const text =
    'The quick brown fox jumps over the lazy dog near the riverbank at dawn';

const Typing: React.FC = () => {
    const { control, errors } = useAppForm<{ typedText: string }>({
        defaultValues: {
            typedText: '',
        },
    });
    return (
        <section className={styles['race-typing']}>
            <Cluster
                className={getClassNames(
                    styles['typing-label'],
                    'with-dash',
                    'text-caps',
                )}
            >
                <span>Your turn — type the text below</span>
            </Cluster>
            <Cluster className={styles['text-display']}>
                {[...text].map((char, index) => {
                    const INDEX_MAX_OFFSET = 20;
                    const correctChar = index < INDEX_MAX_OFFSET;
                    const currentChar = index === INDEX_MAX_OFFSET;
                    const charClasses = getClassNames(
                        char.trim() === '' && styles['char'],
                        correctChar && styles['correct'],
                        currentChar && styles['cursor'],
                    );
                    return (
                        <span className={charClasses} key={index}>
                            {char}
                        </span>
                    );
                })}
            </Cluster>
            <Input
                type="text"
                label=""
                placeholder="Start typing here..."
                name="typedText"
                control={control}
                errors={errors}
            />
            <Cluster className={styles['live-stats']}>
                {mockApi.liveStats.map((stat) => (
                    <div key={stat.id}>
                        <span>{stat.id}</span>
                        <span data-stat={stat.id}>
                            {stat.value}
                            {stat.id === 'acc' && '%'}
                        </span>
                    </div>
                ))}
                <div className={styles['typing-progress']}>
                    <div className={styles['typing-progress-fill']} />
                </div>
                <span className={styles['progress-percent']}>58%</span>
            </Cluster>
        </section>
    );
};

export { Typing };
