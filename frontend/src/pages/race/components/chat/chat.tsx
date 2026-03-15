import styles from './styles.module.css';
import { Cluster, Input, Button } from '~/libs/components/components.js';
import { type ChatMessageDto } from '~/libs/types/types.js';
import { SendIcon } from '~/assets/image/chat/chat.img.js';
import { SectionHeader } from '../section-header/section-header.js';
import { useAppForm, useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { ButtonSizes, ButtonVariants } from '~/libs/enums/enums.js';
import { actions as raceChatActions } from '~/features/game/slices/game.js';

type Properties = {
    roomId: string;
    chat: ChatMessageDto[];
    guest: boolean;
};

const Chat: React.FC<Properties> = ({ roomId, chat, guest }) => {
    const { control, errors, handleSubmit, reset } = useAppForm<{
        chatMessage: string;
    }>({
        defaultValues: {
            chatMessage: '',
        },
    });
    const dispatch = useAppDispatch();

    const handleMessageSend = useCallback(
        (event: React.SyntheticEvent) => {
            void handleSubmit(({ chatMessage }) =>
                dispatch(
                    raceChatActions.initChatMessageSend({
                        message: chatMessage,
                        roomId,
                    }),
                ),
            )(event);
            reset();
        },
        [dispatch, handleSubmit, roomId, reset],
    );

    return (
        <section className={styles['section-chat']}>
            <form onSubmit={handleMessageSend}>
                <SectionHeader className={styles['chat-header']}>
                    <span>Room Chat</span>
                </SectionHeader>
                <div className={styles['chat-message-box']}>
                    {chat.map((payload, index) => (
                        <Cluster className={styles['chat-message']} key={index}>
                            <span className={styles['chat-message-author']}>
                                {payload.userName}
                            </span>
                            <span className={styles['chat-message-text']}>
                                {payload.message}
                            </span>
                        </Cluster>
                    ))}
                </div>
                <Cluster className={styles['chat-input-row']}>
                    <Input
                        label=""
                        name="chatMessage"
                        placeholder="Say something..."
                        control={control}
                        errors={errors}
                        maxLength={Infinity}
                        disabled={guest}
                    />
                    <Button
                        icon={<SendIcon />}
                        label=""
                        isIconOnly
                        iconOnlySize={ButtonSizes.SMALL}
                        variant={ButtonVariants.SECONDARY}
                        size={ButtonSizes.FIT}
                        isDisabled={guest}
                        type="submit"
                    />
                </Cluster>
            </form>
        </section>
    );
};

export { Chat };
