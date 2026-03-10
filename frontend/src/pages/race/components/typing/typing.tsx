import { Cluster, Input } from '~/libs/components/components.js';
import { getClassNames, getPlayerStats } from '~/libs/helpers/helpers.js';
import { useAppForm, useTypingStats } from '~/libs/hooks/hooks.js';
import { RaceTextDisplay } from './components/components.js';
import styles from './styles.module.css';

const text = 'The quick brown fox.';
const MAX_PROGRESS_VALUE = 100;

const Typing: React.FC = () => {
    const { control, errors, watch } = useAppForm<{ typedText: string }>({
        defaultValues: {
            typedText: '',
        },
    });
    const typedText = watch('typedText');

    const { wordPerMinute, accuracy, errorsCount, progress } = useTypingStats({
        typedText,
        targetText: text,
    });

    const playerStats = getPlayerStats({
        wordPerMinute,
        accuracy,
        errorsCount,
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
            <RaceTextDisplay text={text} typedText={typedText} />
            <Input
                type="text"
                label=""
                placeholder="Start typing here..."
                name="typedText"
                control={control}
                errors={errors}
                maxLength={Infinity}
                disabled={progress === MAX_PROGRESS_VALUE}
            />
            <Cluster className={styles['live-stats']}>
                {playerStats.map((stat) => (
                    <div key={stat.label}>
                        <span data-stat={stat.label}>{stat.value}</span>
                        <span>{stat.label}</span>
                    </div>
                ))}
                <div className={styles['typing-progress']}>
                    <div
                        style={{ width: `${String(progress)}%` }}
                        className={styles['typing-progress-fill']}
                    />
                </div>
                <span className={styles['progress-percent']}>{progress}%</span>
            </Cluster>
        </section>
    );
};

export { Typing };
