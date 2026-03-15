import {
    useAppForm,
    useAppDispatch,
    useCallback,
    useNavigate,
} from '~/libs/hooks/hooks.js';
import { joinRoomByCodeValidationSchema } from '../../libs/enums/enums.js';
import { validateJoinCode } from './libs/helpers/validate-join-code.helper.js';
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
import { type RoomResponseDto } from '~/libs/types/types.js';

const JOIN_BY_CODE_INPUT_MAX_LENGTH = 100;

type RoomJoinCodeDto = {
    roomJoinCode: string;
};

type Properties = {
    rooms: RoomResponseDto[];
};

const JoinPanel: React.FC<Properties> = ({ rooms }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { control, errors, handleSubmit, setError } =
        useAppForm<RoomJoinCodeDto>({
            defaultValues: {
                roomJoinCode: '',
            },
            validationSchema: joinRoomByCodeValidationSchema,
        });

    const handleAndValidateRoomJoinByCode = useCallback(
        (roomJoinCode: string) => {
            const isJoinCodeValid = validateJoinCode(rooms, roomJoinCode);
            if (!isJoinCodeValid) {
                setError('roomJoinCode', {
                    message: RoomValidationMessage.INVALID_JOIN_CODE,
                });
                return;
            }
            void dispatch(lobbyActions.joinRoom({ roomId: roomJoinCode }));
            void navigate(`${AppRoute.RACE_BASE}${roomJoinCode}`);
        },
        [dispatch, navigate, rooms, setError],
    );

    const onSubmit = useCallback(
        (event: React.BaseSyntheticEvent) => {
            void handleSubmit(({ roomJoinCode }) => {
                handleAndValidateRoomJoinByCode(roomJoinCode);
            })(event);
        },
        [handleSubmit, handleAndValidateRoomJoinByCode],
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
