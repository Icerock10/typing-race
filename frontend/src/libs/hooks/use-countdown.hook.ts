import { useState, useEffect } from './hooks.js';

type UseCountDownPayload = {
    trigger: boolean;
    initialValue: number;
};

type UseCountDownReturn = {
    countDown: number;
};
const INTERVAL_TICK = 1000;
const COUNTDOWN_OFFSET = 1;
const MIN_COUNTDOWN_VALUE = 0;

const useCountDown = ({
    trigger,
    initialValue,
}: UseCountDownPayload): UseCountDownReturn => {
    const [countDown, setCountDown] = useState<number>(initialValue);
    useEffect(() => {
        if (!trigger) {
            return;
        }

        const interval = setInterval(() => {
            setCountDown((previous) => {
                if (previous <= COUNTDOWN_OFFSET) {
                    clearInterval(interval);
                    return MIN_COUNTDOWN_VALUE;
                }
                return previous - COUNTDOWN_OFFSET;
            });
        }, INTERVAL_TICK);

        return (): void => {
            clearInterval(interval);
        };
    }, [trigger]);

    return {
        countDown,
    };
};

export { useCountDown };
