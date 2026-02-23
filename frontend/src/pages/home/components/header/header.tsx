import { DotsIcon } from '~/assets/image/header/header.img.js';
import { Link } from '~/libs/components/components.js';
import { AppRoute, ButtonVariants } from '~/libs/enums/enums.js';
import { getClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.css';

const Header: React.FC = () => {
    return (
        <div className={getClassNames(styles['header'], 'flex-cluster')}>
            <div className={styles['logo']}>
                <DotsIcon className="icon" />
            </div>
            <div
                className={getClassNames(styles['login-group'], 'flex-cluster')}
            >
                <Link
                    asButtonVariant={ButtonVariants.PRIMARY}
                    to={AppRoute.SIGN_IN}
                >
                    Log In
                </Link>
                <Link
                    asButtonVariant={ButtonVariants.SECONDARY}
                    to={AppRoute.SIGN_UP}
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export { Header };
