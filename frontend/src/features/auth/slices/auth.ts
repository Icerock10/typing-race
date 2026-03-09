import { getCurrentUser, signIn, signUp, updateSocketAuth } from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
    ...actions,
    getCurrentUser,
    signIn,
    signUp,
    updateSocketAuth,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
