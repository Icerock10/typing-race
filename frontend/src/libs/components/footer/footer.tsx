import styles from './styles.module.css';
import { Link, Cluster } from '../components.js';
import { AppRoute } from '~/libs/enums/enums.js';

const FOOTER_MENU_LINKS = [
    {
        label: 'About',
    },
    {
        label: 'GitHub',
    },
    {
        label: 'Discord',
    },
];

const Footer: React.FC = () => {
    return (
        <footer className={styles['footer']}>
            <span>typerace v0.1 — made with ⚡</span>
            <Cluster className={styles['links']}>
                {FOOTER_MENU_LINKS.map((link) => (
                    <Link to={AppRoute.ROOT} key={link.label}>
                        {link.label}
                    </Link>
                ))}
            </Cluster>
        </footer>
    );
};

export { Footer };
