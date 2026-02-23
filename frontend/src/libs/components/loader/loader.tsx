import { getClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.css';

type LoaderContainer = 'fullscreen' | 'inline';
type LoaderSize = 'base' | 'large' | 'medium' | 'small';
type LoaderTheme = 'accent' | 'brand' | 'muted';

type Properties = {
    backdrop?: boolean;
    container?: LoaderContainer;
    isLoading?: boolean;
    size?: LoaderSize;
    theme?: LoaderTheme;
};

const Loader: React.FC<Properties> = ({
    container = 'fullscreen',
    backdrop = container === 'fullscreen',
    isLoading = true,
    size = 'large',
    theme = 'brand',
}: Properties) => {
    const containerClasses = getClassNames(
        styles['loader'],
        styles[container],
        backdrop && styles['backdrop'],
    );
    const spinnerClasses = getClassNames(
        styles['spinner'],
        styles[size],
        styles[theme],
    );

    return isLoading ? (
        <div className={containerClasses}>
            <div className={spinnerClasses} role="status">
                <span className={styles['visually-hidden']}>
                    Loading in progress...
                </span>
            </div>
        </div>
    ) : null;
};

export { Loader };
