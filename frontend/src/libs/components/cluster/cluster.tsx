import { getClassNames } from '~/libs/helpers/get-class-names.js';
import { type ValueOf } from '~/libs/types/types.js';
import { ClusterVariant } from '~/libs/enums/enums.js';

type Properties = {
    children: React.ReactNode;
    className?: string;
    cluster?: ValueOf<typeof ClusterVariant>;
};

const Cluster: React.FC<Properties> = ({
    children,
    className,
    cluster = ClusterVariant.FLEX,
}) => {
    const clusterClasses = getClassNames(className, cluster);
    return <div className={clusterClasses}>{children}</div>;
};

export { Cluster };
