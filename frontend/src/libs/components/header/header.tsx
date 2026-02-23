import styles from './styles.module.css';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { type JSX } from 'react';
import { Link } from '../components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';

type Properties = {
    isCompact?: boolean;
    children: JSX.Element[] | JSX.Element;
};

const Header: React.FC<Properties> = ({ children, isCompact }) => {
    const logoMarkClasses = getClassNames(styles['logo__mark'], 'flex-cluster');

    const headerStyles = getClassNames(
        styles['header'],
        isCompact && styles['header__compact'],
        'flex-cluster',
    );
    return (
        <header className={headerStyles}>
            <Link className="flex-cluster" to={AppRoute.ROOT}>
                <div className={logoMarkClasses}>T_</div>
                <div className={styles['logo__text']}>
                    <span>type</span>
                    <span className={styles['logo__text_highlight']}>race</span>
                </div>
            </Link>
            {children}
        </header>
    );
};

export { Header };
