import { type JSX } from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { EyeIcon } from '~/assets/image/input/input.img.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import {
    useCallback,
    useFormController,
    useId,
    useState,
} from '~/libs/hooks/hooks.js';

import styles from './styles.module.css';

const INPUT_DEFAULT_MAX_LENGTH = 25;

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    disabled?: boolean;
    errorMessage?: string;
    errors: FieldErrors<T>;
    isRequired?: boolean;
    label: string;
    max?: string;
    maxLength?: number;
    min?: string;
    name: FieldPath<T>;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: 'date' | 'email' | 'password' | 'text';
};

const Input = <T extends FieldValues>({
    control,
    disabled = false,
    errorMessage,
    errors,
    isRequired,
    label,
    max,
    maxLength = INPUT_DEFAULT_MAX_LENGTH,
    min,
    name,
    onBlur,
    placeholder = '',
    type = 'text',
}: Properties<T>): JSX.Element => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const inputId = useId();
    const { field } = useFormController({ control, name });
    const error = errors[name]?.message ?? errorMessage;
    const hasError = Boolean(error);
    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((previous) => !previous);
    }, []);

    const inputContainerClass = getClassNames(
        styles['input-container'],
        'flex-cluster',
    );

    const inputFieldClass = getClassNames(
        styles['input-field'],
        hasError && styles['input-field-error'],
        isPasswordField && styles['input-field--password'],
    );
    const toggleIconClasses = getClassNames(
        styles['toggle-icon'],
        showPassword ? styles['active'] : '',
    );

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            field.onBlur();

            if (onBlur) {
                onBlur(event);
            }
        },
        [field, onBlur],
    );

    return (
        <div className={inputContainerClass}>
            <label htmlFor={inputId}>{label}</label>
            <div className={styles['input-wrapper']}>
                <input
                    {...field}
                    aria-invalid={hasError}
                    className={inputFieldClass}
                    disabled={disabled}
                    id={inputId}
                    max={max}
                    maxLength={maxLength}
                    min={min}
                    name={name}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    required={isRequired}
                    type={inputType}
                />
                {isPasswordField && (
                    <button
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                        className={styles['password-toggle-button']}
                        onClick={togglePasswordVisibility}
                        type="button"
                    >
                        <span aria-hidden="true" className={toggleIconClasses}>
                            <EyeIcon width="45px" />
                        </span>
                    </button>
                )}
            </div>
            {hasError && (
                <p className={styles['input-text-error']}>{error as string}</p>
            )}
        </div>
    );
};

export { Input };
