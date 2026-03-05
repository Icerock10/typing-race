import {
    type Control,
    type FieldPath,
    type FieldErrors,
    type FieldValues,
} from 'react-hook-form';
import { type JSX } from 'react';
import { useFormController } from '~/libs/hooks/hooks.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import styles from './styles.module.css';
import { Cluster } from '../components.js';

type RadioOption = {
    icon?: React.ReactNode;
    label: string;
    value: string;
};

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label?: string;
    name: FieldPath<T>;
    options: RadioOption[];
    isIconOnly?: boolean;
};

const RadioGroup = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    options,
    isIconOnly,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ control, name });
    const error = errors[name]?.message;
    const hasError = Boolean(error);
    const fieldsetClasses = getClassNames(
        isIconOnly && 'flex-cluster',
        styles['radio-group-fieldset'],
    );

    return (
        <fieldset className={fieldsetClasses}>
            {label && <legend>{label}</legend>}

            {options.map((option) => {
                const id = `${name}-${option.value}`;
                const isChecked = field.value === option.value;
                const optionClasses = getClassNames(
                    styles['option'],
                    isChecked && styles['option-checked'],
                    isIconOnly && styles['option-avatar'],
                );
                return (
                    <div className={optionClasses} key={option.value}>
                        <input
                            {...field}
                            checked={isChecked}
                            id={id}
                            type="radio"
                            value={option.value}
                        />
                        <Cluster className={styles['option-value']}>
                            {option.icon || option.value}
                        </Cluster>

                        <label className={styles['option-label']} htmlFor={id}>
                            {isIconOnly ? null : option.label}
                        </label>
                    </div>
                );
            })}

            {hasError && <p>{error as string}</p>}
        </fieldset>
    );
};

export { RadioGroup };
