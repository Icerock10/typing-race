import { ArrowRight, ArrowDown, LogoutIcon } from '~/assets/image/image.js';
import { Button } from '../../components.js';
import { useLogoutMenu } from '~/libs/hooks/hooks.js';
import styles from './styles.module.css';

type Properties = {
    name: string;
};

const LogoutMenu: React.FC<Properties> = ({ name }) => {
    const { isMenuOpen, toggleLogOutMenu, handleLogout, menuReference } =
        useLogoutMenu();
    return (
        <>
            <Button
                label=""
                size="fit"
                isIconOnly
                variant="ghost"
                icon={isMenuOpen ? <ArrowDown /> : <ArrowRight />}
                className={styles['arrow-button']}
                onClick={toggleLogOutMenu}
            />
            {isMenuOpen && (
                <div className={styles['logout-menu']} ref={menuReference}>
                    <div className={styles['header-menu']}>
                        <p className={styles['account-menu']}>Account</p>
                        <p>{name}</p>
                    </div>
                    <Button
                        label="Logout"
                        variant="transparent"
                        icon={<LogoutIcon />}
                        className={styles['logout-button']}
                        onClick={handleLogout}
                    />
                </div>
            )}
        </>
    );
};

export { LogoutMenu };
