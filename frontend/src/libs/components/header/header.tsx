import styles from './styles.module.css';
import { AppRoute, HeaderVariants } from '~/libs/enums/enums.js';
import { type JSX } from 'react';
import { Link, Cluster } from '../components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

type Properties = {
    variant?: ValueOf<typeof HeaderVariants>;
    children: JSX.Element[] | JSX.Element;
};

const Header: React.FC<Properties> = ({ children, variant }) => {
    const logoMarkClasses = getClassNames(styles['logo-mark'], 'flex-cluster');

    const headerStyles = getClassNames(
        styles['header'],
        variant === HeaderVariants.COMPACT && styles[`header-${variant}`],
    );

    const headerContainerStyles = getClassNames(
        styles['header-container'],
        variant === HeaderVariants.SHRUNK &&
            styles[`header-container-${variant}`],
    );
    return (
        <header className={headerStyles}>
            <Cluster className={headerContainerStyles}>
                <Link className="flex-cluster" to={AppRoute.ROOT}>
                    <div className={logoMarkClasses}>T_</div>
                    <div className={styles['logo-text']}>
                        <span>type</span>
                        <span className={styles['logo-text-highlight']}>
                            race
                        </span>
                    </div>
                </Link>
                {children}
            </Cluster>
        </header>
    );
};

export { Header };
