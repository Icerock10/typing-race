import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/features/auth/auth.js';

const useAuthInitialization = (): void => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const initializeAuth = useCallback((): void => {
        if (user) {
            return;
        }

        void dispatch(authActions.getCurrentUser());
    }, [dispatch, user]);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);
};

export { useAuthInitialization };
