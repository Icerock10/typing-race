import { AppRoute, ButtonLabels } from '~/libs/enums/enums.js';
import {
    useAppForm,
    useCallback,
    useAppDispatch,
    useNavigate,
} from '~/libs/hooks/hooks.js';
import { type RoomPayload } from '~/libs/types/types.js';
import { DEFAULT_CREATE_ROOM_VALUES } from '../../libs/default-create-room-values.constant.js';
import { actions as lobbyActions } from '~/features/lobby/slices/lobby.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import styles from './styles.module.css';
import {
    Button,
    Input,
    RadioGroup,
    Select,
} from '~/libs/components/components.js';

const Createroom: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { control, errors, handleSubmit } = useAppForm<RoomPayload>({
        defaultValues: DEFAULT_CREATE_ROOM_VALUES,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(
                (formData) => void dispatch(lobbyActions.createRoom(formData)),
            )(event_);
            void navigate(AppRoute.RACE);
        },
        [handleSubmit, dispatch, navigate],
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
                    { label: 'English', value: 'English' },
                    { label: 'Deutsch', value: 'Deutsch' },
                ]}
            />
            <RadioGroup
                control={control}
                errors={errors}
                label="Dificulty"
                name="difficulty"
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
