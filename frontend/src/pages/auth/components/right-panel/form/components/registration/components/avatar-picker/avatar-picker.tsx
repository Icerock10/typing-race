import styles from './styles.module.css';
import { useState, useCallback } from '~/libs/hooks/hooks.js';
import { Button, Cluster } from '~/libs/components/components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';

const AvatarPicker: React.FC = () => {
    const avatars = ['🐱', '🦊', '🐺', '🦅', '🤖', '👾', '🔥', '⚡'];
    const ITEM_START_INDEX = 0;
    const [itemIndex, setItemIndex] = useState<number>(ITEM_START_INDEX);

    const handleAvatarClick = useCallback((index: string) => {
        setItemIndex(+index);
    }, []);

    return (
        <div className={styles['avatar-group']}>
            <div className={styles['avatar-group-label']}>Pick your avatar</div>
            <Cluster>
                {avatars.map((avatar, index) => {
                    return (
                        <Button
                            onClick={handleAvatarClick}
                            value={String(index)}
                            label=""
                            className={getClassNames(
                                styles['avatar-option'],
                                itemIndex === index &&
                                    styles['avatar-option-selected'],
                            )}
                            isIconOnly
                            icon={avatar}
                            key={index}
                        />
                    );
                })}
            </Cluster>
        </div>
    );
};

export { AvatarPicker };
