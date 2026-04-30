import styles from './styles.module.css';
import { getAvatarSource } from '~/libs/helpers/helpers.js';
import { Cluster } from '../components.js';
import { AvatarVariants, OpenAuthProvider } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { HandlerParameterIndexes } from '~/libs/constants/constants.js';
import { LogoutMenu } from './components/logout-menu.js';

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
    const isDiscordAvatar = avatarUrl?.includes(OpenAuthProvider.DISCORD);

    const avatarImage = (
        <img
            alt="avatar"
            src={
                isDiscordAvatar ? avatarUrl : getAvatarSource(String(avatarUrl))
            }
        />
    );

    switch (variant) {
        case AvatarVariants.FULL: {
            return (
                <Cluster className={styles['avatar-full']}>
                    <div className={styles['avatar-image']}>{avatarImage}</div>
                    <span className={styles['user-name']}>
                        {name?.toLowerCase() ?? ''}
                    </span>
                    <LogoutMenu name={name as string} />
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
