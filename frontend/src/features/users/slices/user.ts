import { getAllUsers } from './actions.js';
import { actions } from './user.slice.js';

const allActions = {
    ...actions,
    getAllUsers,
};

export { allActions as actions };
export { reducer } from './user.slice.js';
