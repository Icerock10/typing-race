import { getClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type ButtonVariants } from '~/libs/enums/button-properties-enum.js';
import { type ValueOf } from '~/libs/types/types.js';
import styles from './styles.module.css';

type Properties<T extends string> = {
    className?: string;
    icon?: React.ReactNode;
    iconOnlySize?: 'large' | 'medium' | 'small';
    value?: T;
    isDisabled?: boolean;
    isActive?: boolean;
    isIconOnly?: boolean;
    label: string;
    loader?: React.ReactNode;
    onClick?: (value: T) => void;
    size?: 'large' | 'small' | 'fit';
    type?: 'button' | 'submit';
    variant?: ValueOf<typeof ButtonVariants>;
};

const Button = <T extends string>({
    className = '',
    value,
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
    isActive,
}: Properties<T>): React.ReactNode => {
    const buttonClasses = getClassNames(
        styles['button'],
        styles[`button-${variant}`],
        styles[`button-${size}`],
        isIconOnly && styles['button-icon-only'],
        isIconOnly && styles[`button-icon-only-${iconOnlySize}`],
        isActive && styles[`button-${variant}-active`],
        'flex-cluster',
        className,
    );

    const handleButtonClick = useCallback(() => {
        if (typeof onClick === 'function') {
            onClick(value as T);
        }
    }, [onClick, value]);

    return (
        <button
            aria-label={isIconOnly ? label : undefined}
            className={buttonClasses}
            disabled={isDisabled}
            onClick={handleButtonClick}
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
