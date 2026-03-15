import { Cluster, Input } from '~/libs/components/components.js';
import { getClassNames, getPlayerStats } from '~/libs/helpers/helpers.js';
import { actions as raceActions } from '~/features/game/slices/game.js';
import {
    useAppForm,
    useTypingStats,
    useEffect,
    useAppDispatch,
    useCallback,
    useMemo,
    useRef,
    useAppSelector,
} from '~/libs/hooks/hooks.js';
import { RaceTextDisplay } from './components/components.js';
import styles from './styles.module.css';

const text = 'The quick brown fox.';
const MAX_PROGRESS_VALUE = 100;
const DELAY = 500;

type Properties = {
    isRaceStarted: boolean;
    isRaceFinished: boolean;
    roomId: string;
};

const Typing: React.FC<Properties> = ({
    isRaceStarted,
    roomId,
    isRaceFinished,
}) => {
    const dispatch = useAppDispatch();
    const isTypingReference = useRef(false);
    const { control, errors, watch } = useAppForm<{ typedText: string }>({
        defaultValues: {
            typedText: '',
        },
    });
    const { playerTypingProgress } = useAppSelector((state) => state.game.race);
    const typedText = watch('typedText');

    const { wordPerMinute, accuracy, errorsCount, progress } = useTypingStats({
        typedText,
        targetText: text,
    });

    const playerStats = useMemo(
        () =>
            getPlayerStats({
                wordPerMinute: Number(playerTypingProgress.wpm),
                accuracy: Number(playerTypingProgress.accuracy),
                errorsCount: Number(playerTypingProgress.errors),
            }),
        [playerTypingProgress],
    );

    const hasPlayerFinished = progress === MAX_PROGRESS_VALUE;

    const handlePlayerFinish = useCallback(() => {
        if (hasPlayerFinished) {
            dispatch(raceActions.initPlayerFinish({ roomId }));
        }
    }, [hasPlayerFinished, roomId, dispatch]);

    const handleProgressUpdate = useCallback(() => {
        const playerProgress = {
            wpm: wordPerMinute,
            accuracy,
            progress,
            errors: errorsCount,
            isTyping: isTypingReference.current,
        };
        dispatch(raceActions.updatePlayerProgress({ playerProgress, roomId }));
    }, [wordPerMinute, errorsCount, dispatch, accuracy, progress, roomId]);

    useEffect(() => {
        if (!isRaceStarted) {
            return;
        }
        handlePlayerFinish();
    }, [isRaceStarted, handlePlayerFinish]);

    useEffect(() => {
        if (!isRaceStarted || !typedText) {
            isTypingReference.current = false;
            return;
        }
        isTypingReference.current = true;
        handleProgressUpdate();
        const timeout = setTimeout(() => {
            isTypingReference.current = false;
            handleProgressUpdate();
        }, DELAY);

        return (): void => {
            clearTimeout(timeout);
        };
    }, [handleProgressUpdate, typedText, isRaceStarted]);

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
                disabled={hasPlayerFinished || isRaceFinished}
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
                        style={{
                            width: `${String(playerTypingProgress.progress)}%`,
                        }}
                        className={styles['typing-progress-fill']}
                    />
                </div>
                <span className={styles['progress-percent']}>
                    {playerTypingProgress.progress}%
                </span>
            </Cluster>
        </section>
    );
};

export { Typing };
