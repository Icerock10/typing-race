import { createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type UserDto, type ValueOf } from '~/libs/types/types.js';

import { getCurrentUser, signIn, signUp } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    user: null | UserDto;
    isLoading: boolean;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    user: null,
    isLoading: false,
};

const { actions, name, reducer } = createSlice({
    extraReducers(builder) {
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.user = action.payload;
        });
        builder.addCase(getCurrentUser.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.user = null;
        });

        builder.addMatcher(
            isAnyOf(signUp.fulfilled, signIn.fulfilled),
            (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            },
        );

        builder.addMatcher(isAnyOf(signUp.pending, signIn.pending), (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(
            isAnyOf(signUp.rejected, signIn.rejected),
            (state) => {
                state.isLoading = false;
                state.user = null;
            },
        );
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
