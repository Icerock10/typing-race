import { useAppDispatch } from './use-app-dispatch.hook.js';
import { useState, useCallback, useRef as useReference } from './hooks.js';
import { actions as authActions } from '~/features/auth/auth.js';
import { useClickOutside } from './use-click-outside.hook.js';

type UseLogoutReturn = {
    isMenuOpen: boolean;
    handleLogout: () => void;
    toggleLogOutMenu: () => void;
    menuReference: React.RefObject<HTMLDivElement | null>;
};

const useLogoutMenu = (): UseLogoutReturn => {
    const menuReference = useReference<HTMLDivElement | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useAppDispatch();
    const toggleLogOutMenu = useCallback(() => {
        setIsMenuOpen((previous) => !previous);
    }, []);

    useClickOutside(menuReference, toggleLogOutMenu);

    const handleLogout = useCallback(() => {
        void dispatch(authActions.logout());
        toggleLogOutMenu();
    }, [dispatch, toggleLogOutMenu]);

    return { isMenuOpen, handleLogout, toggleLogOutMenu, menuReference };
};

export { useLogoutMenu };
