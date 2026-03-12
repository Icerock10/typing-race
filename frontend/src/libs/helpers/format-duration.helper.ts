const SECONDS_IN_MS = 1000;
const SECONDS_IN_MINUTE = 60;
const STRING_MAX_LENGTH = 2;

const formatDuration = (ms: number): string => {
    const totalSeconds = Math.floor(ms / SECONDS_IN_MS);
    const minutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);
    const remainingSeconds = totalSeconds % SECONDS_IN_MINUTE;

    return `${minutes.toString()}:${remainingSeconds.toString().padStart(STRING_MAX_LENGTH, '0')}`;
};

export { formatDuration };
