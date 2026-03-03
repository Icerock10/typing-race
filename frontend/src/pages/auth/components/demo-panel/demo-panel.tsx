import { Hero, Stats } from '~/libs/components/components.js';
import { RacePreview } from './race-preview/race-preview.js';
import styles from './styles.module.css';

const DemoPanel: React.FC = () => {
    return (
        <div className={styles['auth-demo-panel']}>
            <Hero
                label="Live right now"
                title={
                    <>
                        Type fast.
                        <br />
                        Race <span className="highlight">harder.</span>
                        <br />
                        Win big.
                    </>
                }
                subtitle="Join thousands of players competing in real-time typing battles. Every word counts."
            />
            <RacePreview />
            <Stats />
        </div>
    );
};

export { DemoPanel };
