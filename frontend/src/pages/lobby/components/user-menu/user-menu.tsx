import { Cluster, Avatar, Link } from '~/libs/components/components.js';
import {
    AvatarVariants,
    AppRoute,
    ButtonVariants,
    ButtonLabels,
    ButtonSizes,
} from '~/libs/enums/enums.js';
import styles from './styles.module.css';
import { type UserDto } from '~/libs/types/types.js';

type Properties = {
    user: UserDto | null;
};

const UserMenu: React.FC<Properties> = ({ user }) => {
    return (
        <Cluster>
            <Cluster className={styles['user-badge']}>
                <div className="live-dot" />
                <span>1,204 online</span>
            </Cluster>
            {user ? (
                <Avatar
                    name={user.userName}
                    variant={AvatarVariants.FULL}
                    avatarUrl={user.avatarUrl}
                />
            ) : (
                <>
                    <Link
                        to={AppRoute.AUTH}
                        asButtonVariant={ButtonVariants.SECONDARY}
                        asButtonSize={ButtonSizes.FIT}
                    >
                        {ButtonLabels.SIGN_IN}
                    </Link>
                    <Link
                        to={AppRoute.AUTH}
                        asButtonVariant={ButtonVariants.PRIMARY}
                        className={styles['header-link']}
                        asButtonSize={ButtonSizes.FIT}
                    >
                        {ButtonLabels.REGISTER}
                    </Link>
                </>
            )}
        </Cluster>
    );
};

export { UserMenu };
