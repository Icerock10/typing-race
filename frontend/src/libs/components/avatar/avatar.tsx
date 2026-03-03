import styles from './styles.module.css';
import { Cluster } from '../components.js';
import { AvatarVariants } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { HandlerParameterIndexes } from '~/libs/constants/constants.js';

type Properties = {
    name?: string;
    icon?: React.ReactNode;
    variant?: ValueOf<typeof AvatarVariants>;
};

const Avatar: React.FC<Properties> = ({
    name,
    icon,
    variant = AvatarVariants.ROUNDED,
}) => {
    const END_INDEX = 1;
    const firstLetter =
        name
            ?.slice(HandlerParameterIndexes.FIRST_PARAM_INDEX, END_INDEX)
            .toUpperCase() ?? '?';

    switch (variant) {
        case AvatarVariants.FULL: {
            return (
                <Cluster className={styles['avatar-full']}>
                    ⚡{name?.toLowerCase() ?? ''}
                </Cluster>
            );
        }
        case AvatarVariants.ROUNDED: {
            return (
                <Cluster className={styles['avatar-rounded']}>
                    {firstLetter}
                </Cluster>
            );
        }
        case AvatarVariants.ICON_ONLY: {
            return (
                <Cluster className={styles['avatar-rounded']}>{icon}</Cluster>
            );
        }
        default: {
            return null;
        }
    }
};
export { Avatar };
