import styles from './styles.module.css';
import { getAvatarSource } from '~/libs/helpers/helpers.js';
import { Cluster } from '../components.js';
import { AvatarVariants } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { HandlerParameterIndexes } from '~/libs/constants/constants.js';

type Properties = {
    name?: string;
    variant?: ValueOf<typeof AvatarVariants>;
    avatarUrl?: string;
};

const Avatar: React.FC<Properties> = ({
    name,
    variant = AvatarVariants.ROUNDED,
    avatarUrl,
}) => {
    const firstLetter =
        name?.charAt(HandlerParameterIndexes.FIRST_PARAM_INDEX).toUpperCase() ??
        '?';

    const avatarImage = (
        <img alt="avatar" src={getAvatarSource(avatarUrl as string)} />
    );

    switch (variant) {
        case AvatarVariants.FULL: {
            return (
                <Cluster className={styles['avatar-full']}>
                    <div className={styles['avatar-image']}>{avatarImage}</div>
                    <span className={styles['user-name']}>
                        {name?.toLowerCase() ?? ''}
                    </span>
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
                <Cluster className={styles['avatar-rounded']}>
                    {avatarImage}
                </Cluster>
            );
        }
        default: {
            return null;
        }
    }
};
export { Avatar };
