import {
    useAppForm,
    useAppDispatch,
    useCallback,
    useAppSelector,
    useNavigate,
} from '~/libs/hooks/hooks.js';
import { joinRoomByCodeValidationSchema } from '../../libs/enums/enums.js';
import { type RoomResponseDto } from '~/libs/types/types.js';
import { Input, Button, Cluster } from '~/libs/components/components.js';
import { actions as lobbyActions } from '~/features/game/slices/game.js';
import styles from './styles.module.css';
import {
    AppRoute,
    ButtonLabels,
    ButtonSizes,
    ButtonVariants,
    RoomValidationMessage,
} from '~/libs/enums/enums.js';

const JOIN_BY_CODE_INPUT_MAX_LENGTH = 100;

const validateJoinCode = (
    rooms: RoomResponseDto[],
    roomJoinCode: string,
): boolean => rooms.some((room) => room.roomId === roomJoinCode);

const JoinPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { rooms } = useAppSelector((state) => state.game);
    const { control, errors, handleSubmit, setError } = useAppForm<{
        roomJoinCode: string;
    }>({
        defaultValues: {
            roomJoinCode: '',
        },
        validationSchema: joinRoomByCodeValidationSchema,
    });

    const joinRoomByCode = useCallback(
        (code: string) => {
            void dispatch(lobbyActions.joinRoom({ roomId: code }));
            void navigate(`${AppRoute.RACE_BASE}${code}`);
        },
        [dispatch, navigate],
    );

    const onSubmit = useCallback(
        (event: React.BaseSyntheticEvent) => {
            void handleSubmit(({ roomJoinCode }) => {
                const isJoinCodeValid = validateJoinCode(rooms, roomJoinCode);
                if (!isJoinCodeValid) {
                    setError('roomJoinCode', {
                        message: RoomValidationMessage.INVALID_JOIN_CODE,
                    });
                    return;
                }
                joinRoomByCode(roomJoinCode);
            })(event);
        },
        [handleSubmit, setError, rooms, joinRoomByCode],
    );

    return (
        <form onSubmit={onSubmit} className={styles['join-panel']}>
            <h3 className={styles['join-panel-title']}>Join by code</h3>
            <Cluster className={styles['button-group']}>
                <Input
                    label=""
                    name="roomJoinCode"
                    type="text"
                    placeholder="ABC-123"
                    control={control}
                    errors={errors}
                    maxLength={JOIN_BY_CODE_INPUT_MAX_LENGTH}
                />
                <Button
                    size={ButtonSizes.SMALL}
                    label={ButtonLabels.JOIN}
                    variant={ButtonVariants.PRIMARY}
                    type="submit"
                    className={styles['join-button']}
                />
            </Cluster>
        </form>
    );
};

export { JoinPanel };
