import { Cluster } from '~/libs/components/components.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import styles from './styles.module.css';

type Properties = {
    text: string;
    typedText: string;
};

const RaceTextDisplay: React.FC<Properties> = ({ text, typedText }) => {
    return (
        <Cluster className={styles['text-display']}>
            {[...text].map((char, index) => {
                const currentIndex = typedText.length;
                const typedChar = typedText[index];
                const isCorrect = typedChar !== undefined && typedChar === char;
                const isWrong = typedChar !== undefined && typedChar !== char;
                const isCursor = index === currentIndex;
                const isWrongSpace = isWrong && char === ' ';

                const charClasses = getClassNames(
                    char.trim() === '' && styles['char'],
                    isCorrect && styles['correct'],
                    isWrong && styles['wrong'],
                    isCursor && styles['cursor'],
                    isWrongSpace && styles['wrong-space'],
                );

                return (
                    <span className={charClasses} key={index}>
                        {char}
                    </span>
                );
            })}
        </Cluster>
    );
};

export { RaceTextDisplay };
