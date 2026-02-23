import { getClassNames } from '~/libs/helpers/helpers.js';
import { type ButtonVariant } from '~/libs/types/button-variant.type.js';

import styles from './styles.module.css';

type Properties = {
    className?: string;
    icon?: React.ReactNode;
    iconOnlySize?: 'large' | 'medium' | 'small';
    isDisabled?: boolean;
    isIconOnly?: boolean;
    label: string;
    loader?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    size?: 'large' | 'small';
    type?: 'button' | 'submit';
    variant?: ButtonVariant;
};

const Button: React.FC<Properties> = ({
    className = '',
    icon,
    iconOnlySize = 'large',
    isDisabled = false,
    isIconOnly = false,
    label,
    loader,
    onClick,
    size = 'large',
    type = 'button',
    variant = 'primary',
}: Properties) => {
    const buttonClasses = getClassNames(
        styles['button'],
        styles[`button-${variant}`],
        styles[`button-${size}`],
        isIconOnly && styles['button-icon-only'],
        isIconOnly && styles[`button-icon-only-${iconOnlySize}`],
        'cluster',
        className,
    );

    return (
        <button
            aria-label={isIconOnly ? label : undefined}
            className={buttonClasses}
            disabled={isDisabled}
            onClick={onClick}
            type={type}
        >
            {icon && (
                <span aria-hidden="true" className={styles['button-icon']}>
                    {icon}
                </span>
            )}
            {!isIconOnly && (
                <span className={styles['button-text']}>{label}</span>
            )}
            {loader}
        </button>
    );
};

export { Button };
