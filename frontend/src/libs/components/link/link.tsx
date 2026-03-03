import { NavLink } from 'react-router-dom';

import buttonStyles from '~/libs/components/button/styles.module.css';
import {
    type AppRoute,
    type ButtonVariants,
    type ButtonSizes,
} from '~/libs/enums/enums.js';
import { getClassNames } from '~/libs/helpers/get-class-names.js';
import { type ValueOf } from '~/libs/types/types.js';
import styles from './styles.module.css';

type Properties = {
    asButtonSize?: ValueOf<typeof ButtonSizes>;
    asButtonVariant?: ValueOf<typeof ButtonVariants>;
    children: React.ReactNode;
    className?: string;
    tabindex?: number;
    to: ValueOf<typeof AppRoute>;
};

const Link: React.FC<Properties> = ({
    asButtonSize = 'small',
    asButtonVariant,
    children,
    className,
    tabindex,
    to,
}: Properties) => {
    const linkClasses = asButtonVariant
        ? getClassNames(
              buttonStyles['button'],
              buttonStyles[`button-${asButtonVariant}`],
              buttonStyles[`button-${asButtonSize}`],
              styles['link'],
          )
        : styles['link'];

    return (
        <NavLink
            className={getClassNames(linkClasses, className)}
            tabIndex={tabindex}
            to={to}
        >
            {children}
        </NavLink>
    );
};

export { Link };
