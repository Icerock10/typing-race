import { Header, Button, Link, Cluster } from '~/libs/components/components.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
    ButtonVariants,
    ButtonLabels,
    AppRoute,
    ClusterVariant,
} from '~/libs/enums/enums.js';
import { useState, useCallback, useEffect } from '~/libs/hooks/hooks.js';
import styles from './styles.module.css';

const highlightedText = ['jumps', 'over', 'the'];

const Auth: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ValueOf<typeof ButtonLabels>>(
        ButtonLabels.SIGN_IN,
    );
    const [text, setText] = useState<string>('The quick brown fox');

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];
        for (let [index, element] of highlightedText.entries()) {
            const delay = 2000;
            const timer = setTimeout(() => {
                setText((previous) => previous + ' ' + element);
            }, ++index * delay);
            timers.push(timer);
        }
        return (): void => {
            for (const timer of timers) {
                clearTimeout(timer);
            }
        };
    }, []);

    const toggleTab = useCallback(() => {
        setActiveTab((previous) =>
            previous === ButtonLabels.SIGN_IN
                ? ButtonLabels.REGISTER
                : ButtonLabels.SIGN_IN,
        );
    }, []);

    return (
        <>
            <div className={styles['glow-top-left']} />
            <Header>
                <div className={styles['header-tabs']}>
                    <Button
                        size="small"
                        label={ButtonLabels.SIGN_IN}
                        variant={ButtonVariants.TAB}
                        isActive={activeTab === ButtonLabels.SIGN_IN}
                        onClick={toggleTab}
                    />
                    <Button
                        size="small"
                        label={ButtonLabels.REGISTER}
                        variant={ButtonVariants.TAB}
                        onClick={toggleTab}
                        isActive={activeTab === ButtonLabels.REGISTER}
                    />
                </div>
                <div className={styles['header-nav']}>
                    <span>Back to </span>
                    <Link to={AppRoute.ROOT}>lobby →</Link>
                </div>
            </Header>
            <Cluster cluster={ClusterVariant.GRID} className={styles['auth']}>
                <div className={styles['auth-left-panel']}>
                    <Cluster
                        cluster={ClusterVariant.FLEX}
                        className={styles['left-panel-label']}
                    >
                        ⚡ Live right now
                    </Cluster>
                    <h1>
                        Type fast.
                        <br />
                        <span>Race </span>
                        <span className={styles['highlight']}>harder.</span>
                        <br />
                        Win big.
                    </h1>
                    <p className={styles['auth-left-sub']}>
                        Join thousands of players competing in real-time typing
                        battles. Every word counts.
                    </p>
                    <div className={styles['race-preview']}>
                        <Cluster
                            cluster={ClusterVariant.FLEX}
                            className={styles['race-header']}
                        >
                            <span className={styles['race-title']}>
                                Room: Speed Demons 🔥
                            </span>
                            <div className={styles['race-live']}>
                                <div className={styles['live-dot']} /> Live
                            </div>
                        </Cluster>
                        <div className={styles['race-text']}>
                            <span className={styles['typed']}>{text}</span>
                            <span className={styles['cursor']} />{' '}
                            <span>
                                jumps over the lazy dog near the riverbank at
                                dawn.&quot;
                            </span>
                        </div>
                        <div className="racers">
                            <Cluster
                                cluster={ClusterVariant.FLEX}
                                className={styles['racer-row']}
                            >
                                <Cluster
                                    cluster={ClusterVariant.FLEX}
                                    className={styles['racer-avatar']}
                                >
                                    K
                                </Cluster>
                                <span className={styles['racer-name']}>
                                    k1netic
                                </span>
                                <div className={styles['racer-progress']}>
                                    <div
                                        className={
                                            styles['racer-progress-fill']
                                        }
                                    />
                                </div>
                                <span className={styles['racer-wpm']}>
                                    148 wpm
                                </span>
                            </Cluster>
                        </div>
                    </div>
                    <Cluster
                        cluster={ClusterVariant.FLEX}
                        className={styles['auth-stats']}
                    >
                        <div className="stat">
                            <div className={styles['stat-value']}>1,204</div>
                            <div className={styles['stat-label']}>
                                online now
                            </div>
                        </div>
                        <div className="stat">
                            <div className={styles['stat-value']}>14</div>
                            <div className={styles['stat-label']}>
                                open rooms
                            </div>
                        </div>
                        <div className="stat">
                            <div className={styles['stat-value']}>201 wpm</div>
                            <div className={styles['stat-label']}>
                                Today`s record
                            </div>
                        </div>
                    </Cluster>
                </div>
                <div className={styles['auth-right-panel']}>Right col</div>
            </Cluster>
        </>
    );
};

export { Auth };
