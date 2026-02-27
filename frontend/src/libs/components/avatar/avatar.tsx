import styles from './styles.module.css';
import { Cluster } from '../components.js';
import { HandlerParameterIndexes } from '~/libs/constants/constants.js';

type Properties = {
    name?: string;
    icon?: React.ReactNode;
};

const Avatar: React.FC<Properties> = ({ name, icon }) => {
    const END_INDEX = 1;
    const firstLetter = name
        ?.slice(HandlerParameterIndexes.FIRST_PARAM_INDEX, END_INDEX)
        .toUpperCase();
    if (icon) {
        return <Cluster className={styles['avatar']}>{icon}</Cluster>;
    }

    return <Cluster className={styles['avatar']}>{firstLetter}</Cluster>;
};
export { Avatar };
