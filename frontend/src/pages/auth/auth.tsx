import { type JSX } from 'react';

import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useLocation,
} from '~/libs/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/libs/types/types.js';
import { actions as authActions } from '~/features/auth/auth.js';

import { SignInForm, SignUpForm } from './components/components.js';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { pathname } = location;

    const { dataStatus } = useAppSelector(({ auth }) => auth);

    const isLoading = dataStatus === DataStatus.PENDING;

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload));
        },
        [dispatch],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    const getScreen = (screen: string): JSX.Element => {
        switch (screen) {
            case AppRoute.SIGN_IN: {
                return (
                    <SignInForm
                        isLoading={isLoading}
                        onSubmit={handleSignInSubmit}
                    />
                );
            }

            case AppRoute.SIGN_UP: {
                return (
                    <SignUpForm
                        isLoading={isLoading}
                        onSubmit={handleSignUpSubmit}
                    />
                );
            }
        }

        return <></>;
    };

    return getScreen(pathname);
};

export { Auth };
