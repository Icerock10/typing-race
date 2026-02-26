import { ClusterVariant } from '~/libs/enums/enums.js';
import { Cluster } from '../components.js';
import styles from './styles.module.css';

type Properties = {
    label: string;
    title: React.ReactNode;
    subtitle: string;
    isLobbyPage?: boolean;
};

const Hero: React.FC<Properties> = ({
    label,
    title,
    subtitle,
    isLobbyPage,
}) => {
    return (
        <section
            className={isLobbyPage ? styles['hero-lobby'] : styles['hero']}
        >
            <Cluster
                cluster={ClusterVariant.FLEX}
                className={styles['hero-label']}
            >
                ⚡ <span>{label}</span>
            </Cluster>

            <h1>{title}</h1>

            <p className={styles['hero-sub']}>{subtitle}</p>
        </section>
    );
};

export { Hero };
