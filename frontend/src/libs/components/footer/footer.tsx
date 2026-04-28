import styles from './styles.module.css';
import { Link, Cluster } from '../components.js';
import { type AppRoute } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
// eslint-disable-next-line import/extensions
import manifest from '~/../../.release-please-manifest.json' with { type: 'json' };

const FOOTER_MENU_LINKS = [
    {
        label: 'GitHub',
        path: 'https://github.com/Icerock10',
    },
    {
        label: 'Discord',
        path: 'https://discord.com/',
    },
];

const Footer: React.FC = () => {
    return (
        <footer className={styles['footer']}>
            <span>typerace v{manifest['.']} — made with ⚡</span>
            <Cluster className={styles['links']}>
                {FOOTER_MENU_LINKS.map((link) => (
                    <Link
                        to={link.path as unknown as ValueOf<typeof AppRoute>}
                        key={link.label}
                    >
                        {link.label}
                    </Link>
                ))}
            </Cluster>
        </footer>
    );
};

export { Footer };
