import { ButtonLabels } from '~/libs/enums/enums.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import styles from './styles.module.css';
import {
    Button,
    Input,
    RadioGroup,
    Select,
} from '~/libs/components/components.js';

const Createroom: React.FC = () => {
    type RoomCreateDto = {
        roomName: string;
        language: 'English' | 'Deutsch';
        dificulty: 'easy' | 'medium' | 'hard';
        maxPlayers: string;
    };

    const { control, errors, handleSubmit } = useAppForm<RoomCreateDto>({
        defaultValues: {
            roomName: '',
            dificulty: 'easy',
            maxPlayers: '4',
            language: 'English',
        },
    });

    const onSubmit = useCallback(() => {
        return {};
    }, []);

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    const formClasses = getClassNames(styles['form'], 'flex-cluster');
    return (
        <form onSubmit={handleFormSubmit} className={formClasses}>
            <h3 className={styles['form-title']}>Create a Room</h3>
            <Input
                label="Room name"
                name="roomName"
                type="text"
                placeholder="My awesome room"
                control={control}
                errors={errors}
            />
            <Select
                control={control}
                errors={errors}
                label="Language"
                name="language"
                options={[
                    { label: 'English', value: 'en' },
                    { label: 'Deutsch', value: 'de' },
                ]}
            />
            <RadioGroup
                control={control}
                errors={errors}
                label="Dificulty"
                name="dificulty"
                options={[
                    { label: 'Easy', value: 'easy', icon: '⚡' },
                    { label: 'Medium', value: 'medium', icon: '⚡' },
                    { label: 'Hard', value: 'hard', icon: '⚡' },
                ]}
            />
            <RadioGroup
                control={control}
                errors={errors}
                label="max players"
                name="maxPlayers"
                options={[
                    { label: 'Duel', value: '2' },
                    { label: 'Squad', value: '4' },
                    { label: 'Lobby', value: '6' },
                ]}
            />

            <Button
                type="submit"
                className={styles['form-button']}
                label={ButtonLabels.CREATE_ROOM}
            />
        </form>
    );
};

export { Createroom };
