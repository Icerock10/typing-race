const RaceSocketEvent = {
    SET_READY_STATUS: 'race-set-ready-status',
    RACE_STARTED: 'race-started',
    UPDATE_PROGRESS: 'race-update-progress',
    RACE_FINISHED: 'race-finished',
    PLAYER_FINISHED: 'race-player-finished',
    PLAYER_RECONNECTED: 'race-player-reconnected',
} as const;

export { RaceSocketEvent };
