import {
    getCurrentUser,
    signIn,
    signUp,
    updateSocketAuth,
    logout,
} from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
    ...actions,
    getCurrentUser,
    signIn,
    signUp,
    updateSocketAuth,
    logout,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
