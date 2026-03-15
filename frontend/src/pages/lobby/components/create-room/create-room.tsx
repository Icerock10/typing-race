import { AppRoute, ButtonLabels } from '~/libs/enums/enums.js';
import { roomCreateValidationSchema } from '../../libs/enums/enums.js';
import {
    useAppForm,
    useCallback,
    useAppDispatch,
    useNavigate,
    useEffect,
} from '~/libs/hooks/hooks.js';
import {
    type UserDto,
    type RoomPayload,
    type RoomResponseDto,
} from '~/libs/types/types.js';
import { DEFAULT_CREATE_ROOM_VALUES } from '../../libs/constants/constants.js';
import { actions as lobbyActions } from '~/features/game/slices/game.js';
import { getClassNames } from '~/libs/helpers/helpers.js';
import styles from './styles.module.css';
import {
    Button,
    Input,
    RadioGroup,
    Select,
} from '~/libs/components/components.js';

type Properties = {
    user: UserDto | null;
    currentRoom: RoomResponseDto | null;
};

const Createroom: React.FC<Properties> = ({ user, currentRoom }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { control, errors, handleSubmit } = useAppForm<RoomPayload>({
        defaultValues: DEFAULT_CREATE_ROOM_VALUES,
        validationSchema: roomCreateValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit((formData) =>
                dispatch(lobbyActions.createRoom(formData)),
            )(event_);
        },
        [handleSubmit, dispatch],
    );

    useEffect(() => {
        if (currentRoom && currentRoom.hostId === user?.id) {
            void navigate(`${AppRoute.RACE_BASE}${String(currentRoom.roomId)}`);
            dispatch(lobbyActions.resetCurrentRoom());
        }
    }, [navigate, currentRoom, dispatch, user?.id]);

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
                isDisabled={!user?.id}
            />
        </form>
    );
};

export { Createroom };
