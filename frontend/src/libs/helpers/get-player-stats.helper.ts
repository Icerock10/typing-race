type PlayerStatsPayload = {
    wordPerMinute: number;
    errorsCount: number;
    accuracy: number;
};
type PlayerStats = { label: string; value: number | string }[];

const getPlayerStats = ({
    wordPerMinute,
    errorsCount,
    accuracy,
}: PlayerStatsPayload): PlayerStats => [
    { label: 'wpm', value: wordPerMinute },
    { label: 'error', value: errorsCount },
    { label: 'accuracy', value: `${String(accuracy)}%` },
];

export { getPlayerStats };
