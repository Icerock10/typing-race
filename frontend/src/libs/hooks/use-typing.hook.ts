import { useState, useEffect, useRef as useReference } from './hooks.js';

const DEFAULT_DELAY = 2000;
const INDEX_REFERENCE_VALUE = 0;
const INDEX_OFFSET = 1;

type Parameters = {
    initialText: string;
    words: string[];
    delay?: number;
};

const useTyping = ({
    initialText,
    words,
    delay = DEFAULT_DELAY,
}: Parameters): { text: string } => {
    const [text, setText] = useState<string>(initialText);
    const indexReference = useReference<number>(INDEX_REFERENCE_VALUE);

    useEffect(() => {
        const interval = setInterval(() => {
            if (indexReference.current < words.length) {
                const currentIndex = indexReference.current;
                setText(
                    (previous) =>
                        `${previous} ${words[currentIndex] as string}`,
                );

                indexReference.current = currentIndex + INDEX_OFFSET;
            } else {
                setText(initialText);
                indexReference.current = 0;
            }
        }, delay);

        return (): void => {
            clearInterval(interval);
        };
    }, []);

    return { text };
};

export { useTyping };
