import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useLocation,
    useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/features/auth/auth.js';
import { StorageKey, storage } from '../modules/storage/storage.js';

const useAuthInitialization = (): void => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const location = useLocation();

    const initializeAuth = useCallback((): void => {
        if (user) {
            return;
        }

        void dispatch(authActions.getCurrentUser());
    }, [dispatch, user]);

    useEffect(() => {
        const parameters = new URLSearchParams(location.search);
        const token = parameters.get(StorageKey.TOKEN);
        if (token) {
            void storage.set(StorageKey.TOKEN, token);
        }

        initializeAuth();
    }, [initializeAuth, location.search]);
};

export { useAuthInitialization };
