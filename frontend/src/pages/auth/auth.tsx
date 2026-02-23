import { type JSX } from 'react';
import { useLocation } from '~/libs/hooks/hooks.js';

const Auth: React.FC = () => {
    const location = useLocation();
    const { pathname } = location;

    const getScreen = (screen: string): JSX.Element => {
        switch (screen) {
            case 'sign-in': {
                return <div>Sign in</div>;
            }

            case 'sign-up': {
                return <div>Sign up</div>;
            }
        }

        return <></>;
    };

    return getScreen(pathname);
};

export { Auth };
