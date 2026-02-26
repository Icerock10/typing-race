import { useAppForm } from '~/libs/hooks/hooks.js';
import { Input, Button, Cluster } from '~/libs/components/components.js';
import styles from './styles.module.css';
import {
    ButtonLabels,
    ButtonSizes,
    ButtonVariants,
    ClusterVariant,
} from '~/libs/enums/enums.js';

const JoinPanel: React.FC = () => {
    const { control, errors } = useAppForm<{ code: string }>({
        defaultValues: {
            code: '',
        },
    });

    return (
        <Cluster cluster={ClusterVariant.GRID} className={styles['join-panel']}>
            <h3>Join by code</h3>
            <Cluster className={styles['button-group']}>
                <Input
                    label=""
                    name="code"
                    type="text"
                    placeholder="ABC-123"
                    control={control}
                    errors={errors}
                />
                <Button
                    size={ButtonSizes.SMALL}
                    label={ButtonLabels.JOIN}
                    variant={ButtonVariants.PRIMARY}
                    className={styles['join-button']}
                />
            </Cluster>
        </Cluster>
    );
};

export { JoinPanel };
