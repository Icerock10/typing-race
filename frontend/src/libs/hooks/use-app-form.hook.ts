import { zodResolver } from '@hookform/resolvers/zod';
import {
    type Control,
    type DefaultValues,
    type FieldErrors,
    type FieldValues,
    type FormState,
    type Resolver,
    useForm,
    type UseFormGetValues,
    type UseFormHandleSubmit,
    type UseFormProps,
    type UseFormReset,
    type UseFormSetError,
    type UseFormSetValue,
    type UseFormWatch,
    type ValidationMode,
} from 'react-hook-form';

import { type ValidationSchema } from '~/libs/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
    defaultValues: DefaultValues<T>;
    mode?: keyof ValidationMode;
    validationSchema?: ZodValidationSchema;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    dirtyFields?: FormState<T>['dirtyFields'];
    errors: FieldErrors<T>;
    getValues: UseFormGetValues<T>;
    handleSubmit: UseFormHandleSubmit<T>;
    isDirty: boolean;
    isSubmitting: boolean;
    reset: UseFormReset<T>;
    setError?: UseFormSetError<T>;
    setValue: UseFormSetValue<T>;
    watch: UseFormWatch<T>;
};

type ZodValidationSchema<T extends FieldValues = FieldValues> =
    ValidationSchema<T, T>;

const useAppForm = <T extends FieldValues = FieldValues>({
    defaultValues,
    mode = 'onSubmit',
    validationSchema,
}: Parameters<T>): ReturnValue<T> => {
    let parameters: UseFormProps<T> = {
        defaultValues,
        mode,
    };

    if (validationSchema) {
        parameters = {
            ...parameters,
            resolver: zodResolver(validationSchema) as Resolver<T>,
        };
    }

    const {
        control,
        formState: { dirtyFields, errors, isDirty, isSubmitting },
        getValues,
        handleSubmit,
        reset,
        setError,
        setValue,
        watch,
    } = useForm<T>(parameters);

    return {
        control,
        dirtyFields,
        errors,
        getValues,
        handleSubmit,
        isDirty,
        isSubmitting,
        reset,
        setError,
        setValue,
        watch,
    };
};

export { useAppForm };
