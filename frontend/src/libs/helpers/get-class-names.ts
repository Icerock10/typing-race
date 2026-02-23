import clsx, { type ClassValue } from 'clsx';

const getClassNames = (...classes: ClassValue[]): string => {
    return clsx(classes);
};

export { getClassNames };
