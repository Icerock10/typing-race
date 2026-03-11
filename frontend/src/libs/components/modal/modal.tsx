import { useEffect, useState } from '~/libs/hooks/hooks.js';
import { createPortal } from 'react-dom';
import { CrossIcon } from '~/assets/image/image.js';
import { Button, Cluster } from '~/libs/components/components.js';
import { ButtonSizes, ButtonVariants } from '~/libs/enums/enums.js';
import { getClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.css';

const ANIMATION_DELAY = 300;

type Properties = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    title?: string;
    modalReference?: React.RefObject<HTMLDialogElement | null>;
};

const Modal: React.FC<Properties> = ({
    children,
    isOpen,
    onClose,
    title,
    modalReference,
}) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(
        null,
    );
    const [shouldRender, setShouldRender] = useState(isOpen);
    useEffect(() => {
        setPortalElement(document.body);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
        } else {
            const timeout = setTimeout(() => {
                setShouldRender(false);
            }, ANIMATION_DELAY);
            return (): void => {
                clearTimeout(timeout);
            };
        }
    }, [isOpen]);

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = isOpen ? 'hidden' : originalOverflow;

        return (): void => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    if (!portalElement || !shouldRender) {
        return null;
    }

    return createPortal(
        <dialog
            open
            ref={modalReference}
            className={getClassNames(
                styles['modal-overlay'],
                isOpen ? styles['modal-opening'] : styles['modal-closing'],
            )}
        >
            <div className={styles['modal-content']}>
                {title && (
                    <Cluster className={styles['modal-header']}>
                        <h3 className={styles['modal-title']}>{title}</h3>
                        <Button
                            className={styles['modal-close-btn']}
                            icon={<CrossIcon />}
                            isIconOnly
                            label=""
                            onClick={onClose}
                            size={ButtonSizes.FIT}
                            variant={ButtonVariants.SECONDARY}
                        />
                    </Cluster>
                )}
                <div className={styles['modal-body']}>{children}</div>
            </div>
        </dialog>,
        portalElement,
    );
};

export { Modal };
