import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { type JSX } from 'react';
import { useFormController, useId } from '~/libs/hooks/hooks.js';
import { Cluster } from '../components.js';

import styles from './styles.module.css';

type SelectOption = {
    label: string;
    value: string;
};

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label?: string;
    name: FieldPath<T>;
    options: SelectOption[];
};

const Select = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    options,
}: Properties<T>): JSX.Element => {
    const id = useId();
    const { field } = useFormController({ control, name });
    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <Cluster className={styles['select-container']}>
            {label && (
                <label className={styles['select-label']} htmlFor={id}>
                    {label}
                </label>
            )}

            <select className={styles['select']} {...field} id={id}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {hasError && <p>{error as string}</p>}
        </Cluster>
    );
};

export { Select };
