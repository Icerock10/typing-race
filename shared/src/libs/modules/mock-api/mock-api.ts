const mockApi = {
    racersPreview: [
        {
            avatar: 'K',
            name: 'kinetic',
            wpm: 148,
        },
        {
            avatar: 'V',
            name: 'voxel_',
            wpm: 132,
        },
        {
            avatar: 'R',
            name: 'rocketfin',
            wpm: 117,
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
