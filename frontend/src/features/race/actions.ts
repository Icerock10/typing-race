import { createAction } from '@reduxjs/toolkit';

type ReadyStatusPayload = {
    roomId: string;
    isReady: boolean;
};

const ActionType = {
    SET_READY_STATUS: 'race/set-ready',
};

const setReadyStatus = createAction<ReadyStatusPayload>(
    ActionType.SET_READY_STATUS,
);

const allActions = {
    setReadyStatus,
};

export { allActions as actions };
