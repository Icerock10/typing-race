import {
    ButtonLabels,
    ButtonVariants,
    HeaderVariants,
} from '~/libs/enums/enums.js';
import { Ticker } from './components/components.js';
import { Header, Button, Cluster } from '~/libs/components/components.js';
import styles from './styles.module.css';

const Lobby: React.FC = () => {
    return (
        <>
            <Ticker />
            <Header variant={HeaderVariants.SHRUNK}>
                <Cluster>
                    <Cluster className={styles['user-badge']}>
                        <div className="live-dot" />
                        <span>1,204 online</span>
                    </Cluster>
                    <Button
                        variant={ButtonVariants.SECONDARY}
                        size="fit"
                        label={ButtonLabels.SIGN_IN}
                    />
                    <Button
                        size="fit"
                        variant={ButtonVariants.PRIMARY}
                        className={styles['button-register']}
                        label={ButtonLabels.REGISTER}
                    />
                </Cluster>
            </Header>
        </>
    );
};

export { Lobby };
