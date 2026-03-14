const STATS_CONFIG = [
    { key: 'onlineUsers', dataStat: 'online', label: 'Online now' },
    { key: 'activeRooms', dataStat: 'rooms', label: 'Open rooms' },
    { key: 'wpm', dataStat: 'record', label: 'Todays record' },
] as const;

export { STATS_CONFIG };
