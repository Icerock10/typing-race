import { Cluster } from '~/libs/components/components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';

const SectionHeader: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className }) => (
    <Cluster className={getClassNames('with-dash', 'text-caps', className)}>
        <span>{children}</span>
    </Cluster>
);

export { SectionHeader };
