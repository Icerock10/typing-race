import styles from './styles.module.css';
import { Link, Cluster } from '../components.js';
import { AppRoute, ButtonVariants } from '~/libs/enums/enums.js';

const Footer: React.FC = () => {
    return (
        <footer className={styles['footer']}>
            <span>typerace v0.1 — made with ⚡</span>
            <Cluster className={styles['links']}>
                <Link
                    asButtonVariant={ButtonVariants.TRANSPARENT}
                    to={AppRoute.ROOT}
                >
                    About
                </Link>
                <Link
                    asButtonVariant={ButtonVariants.TRANSPARENT}
                    to={AppRoute.ROOT}
                >
                    GitHub
                </Link>
                <Link
                    asButtonVariant={ButtonVariants.TRANSPARENT}
                    to={AppRoute.ROOT}
                >
                    Discord
                </Link>
            </Cluster>
        </footer>
    );
};

export { Footer };
