import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getClassNames } from '~/libs/helpers/get-class-names.js';

import styles from './styles.module.css';

const CRATER_SIZES = [
    'moon-crater-small',
    'moon-crater-medium',
    'moon-crater-large',
];
const STAR_VARIANTS = [
    'star-fast',
    'star-medium',
    'star-slow',
    'star-very-slow',
];
const createMoonCraterElements = CRATER_SIZES.map((craterSize) => {
    const moonCraterClasses = getClassNames(
        styles['moon-crater'],
        styles[craterSize],
    );

    return <div className={moonCraterClasses} key={craterSize} />;
});

const createStarElements = STAR_VARIANTS.map((starVariant) => {
    const starClasses = getClassNames(styles['star'], styles[starVariant]);

    return <div className={starClasses} key={starVariant} />;
});

const NotFound: React.FC = () => (
    <div className={styles['wrapper']}>
        <div className={styles['moon']} />
        {createMoonCraterElements}
        {createStarElements}
        <div className={styles['error']}>
            <div className={styles['error-title']}>404</div>
            <div className={styles['error-subtitle']}>Hmmm...</div>
            <div className={styles['error-description']}>
                It looks like one of the developers fell asleep
            </div>
            <Link to={AppRoute.ROOT}>Back to the Homepage</Link>
        </div>
    </div>
);

export { NotFound };
