import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type UserDto, type ValueOf } from '~/libs/types/types.js';

import { getCurrentUser, signIn, signUp } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: null | UserDto;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: null,
};

const { actions, name, reducer } = createSlice({
    extraReducers(builder) {
        builder.addCase(signUp.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.user = action.payload;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.user = null;
        });

        builder.addCase(signIn.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.user = action.payload;
        });
        builder.addCase(signIn.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.user = null;
        });
        builder.addCase(getCurrentUser.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.user = action.payload;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.user = null;
        });
    },
    initialState,
    name: 'auth',
    reducers: {
        resetAuthState: (state) => {
            state.dataStatus = DataStatus.IDLE;
            state.user = null;
        },
        setUser(state, action: PayloadAction<null | UserDto>) {
            state.user = action.payload;
        },
    },
});

export { actions, name, reducer };
