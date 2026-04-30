import { useEffect } from './hooks.js';

const useClickOutside = <T extends HTMLElement>(
    reference: React.RefObject<T | null>,
    callback: () => void,
): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                reference.current &&
                !reference.current.contains(event.target as Node)
            ) {
                callback();
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return (): void => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [reference, callback]);
};

export { useClickOutside };
