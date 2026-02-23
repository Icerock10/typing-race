import { NavLink } from 'react-router-dom';

import buttonStyles from '~/libs/components/button/styles.module.css';
import { type AppRoute } from '~/libs/enums/enums.js';
import { getClassNames } from '~/libs/helpers/get-class-names.js';
import {
    type ButtonSize,
    type ButtonVariant,
    type ValueOf,
} from '~/libs/types/types.js';

import styles from './styles.module.css';

type Properties = {
    asButtonSize?: ButtonSize;
    asButtonVariant?: ButtonVariant;
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
        : '';

    return (
        <NavLink
            className={getClassNames(linkClasses, className)}
            tabIndex={tabindex}
            to={to}
        >
            {asButtonVariant ? children : <span>{children}</span>}
        </NavLink>
    );
};

export { Link };
