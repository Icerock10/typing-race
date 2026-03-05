const mockApi = {
    racersPreview: [
        {
            name: 'kinetic',
            wpm: 148,
            isFinished: true,
        },
        {
            name: 'voxel_',
            wpm: 132,
            isFinished: false,
        },
        {
            name: 'rocketfin',
            wpm: 117,
            isFinished: false,
        },
    ],
    stats: [
        { id: 'online', value: 1204, text: 'Online now' },
        { id: 'rooms', value: 14, text: 'Open rooms' },
        { id: 'record', value: 201, text: 'Today`s record' },
    ],
    liveStats: [
        { id: 'wpm', value: 112 },
        { id: 'acc', value: 97 },
        { id: 'err', value: 3 },
    ],
    tickers: Array.from({ length: 5 }),
};

export { mockApi };
