import {
    useRef as useReference,
    useState,
    useEffect,
    useCallback,
} from './hooks.js';
import { HandlerParameterIndexes } from '~/libs/enums/enums.js';

type TypingStatsPayload = {
    typedText: string;
    targetText: string;
};

type TypingStatsReturn = {
    accuracy: number;
    wordPerMinute: number;
    errorsCount: number;
    progress: number;
};

const ONE_MINUTE = 60_000;
const ACCURACY_MULTIPLIER = 100;
const CHARS_PER_WORD = 5;
const INITIAL_VALUE = 0;
const MIN_ELAPSED_MINUTES = 0.001;

const useTypingStats = ({
    typedText,
    targetText,
}: TypingStatsPayload): TypingStatsReturn => {
    const [accuracy, setAccuracy] = useState(ACCURACY_MULTIPLIER);
    const [wordPerMinute, setWordPerMinute] = useState(INITIAL_VALUE);
    const [errorsCount, setErrorsCount] = useState(INITIAL_VALUE);
    const [progress, setProgress] = useState(INITIAL_VALUE);
    const errorIndices = useReference<Set<number>>(new Set());
    const startTimeReference = useReference<number | null>(null);

    const resetStats = useCallback(() => {
        startTimeReference.current = null;
        errorIndices.current.clear();
        setErrorsCount(INITIAL_VALUE);
        setWordPerMinute(INITIAL_VALUE);
        setAccuracy(ACCURACY_MULTIPLIER);
        setProgress(INITIAL_VALUE);
    }, [errorIndices, startTimeReference]);

    useEffect(() => {
        if (typedText.length === INITIAL_VALUE) {
            resetStats();
            return;
        }
        if (!startTimeReference.current) {
            startTimeReference.current = Date.now();
        }
        const newIndex =
            typedText.length - HandlerParameterIndexes.SECOND_PARAM_INDEX;
        if (typedText[newIndex] !== targetText[newIndex]) {
            errorIndices.current.add(newIndex);
        }

        const elapsedMinutes =
            (Date.now() - startTimeReference.current) / ONE_MINUTE;
        if (elapsedMinutes < MIN_ELAPSED_MINUTES) {
            return;
        }
        const standartWords = typedText.length / CHARS_PER_WORD;
        const wpm = Math.round(standartWords / elapsedMinutes);

        const totalErrors = errorIndices.current.size;
        const totalKeystrokes = typedText.length + totalErrors;

        const accuracy = Math.round(
            ((totalKeystrokes - totalErrors) / totalKeystrokes) *
                ACCURACY_MULTIPLIER,
        );

        const correctChars = [...typedText].filter(
            (char, index) => char === targetText[index],
        ).length;
        const typingProgress = Math.round(
            (correctChars / targetText.length) * ACCURACY_MULTIPLIER,
        );

        setErrorsCount(totalErrors);
        setAccuracy(
            Math.max(HandlerParameterIndexes.FIRST_PARAM_INDEX, accuracy),
        );
        setWordPerMinute(wpm);
        setProgress(typingProgress);
    }, [typedText, errorIndices, startTimeReference, targetText, resetStats]);

    return {
        accuracy,
        wordPerMinute,
        errorsCount,
        progress,
    };
};

export { useTypingStats };
