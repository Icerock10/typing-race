import styles from './styles.module.css';
import { Cluster, Input, Button } from '~/libs/components/components.js';
import { SendIcon } from '~/assets/image/chat/chat.img.js';
import { SectionHeader } from '../section-header/section-header.js';
import { useAppForm } from '~/libs/hooks/hooks.js';
import { ButtonSizes, ButtonVariants } from '~/libs/enums/enums.js';

const Chat: React.FC = () => {
    const { control, errors } = useAppForm<{ chatMessage: string }>({
        defaultValues: {
            chatMessage: '',
        },
    });
    return (
        <section className={styles['section-chat']}>
            <SectionHeader className={styles['chat-header']}>
                <span>Room Chat</span>
            </SectionHeader>
            <div className={styles['chat-messages']}>
                <span className={styles['chat-message-text']}>
                    Race started! Type as fast as you can 🏁
                </span>
            </div>
            <Cluster className={styles['chat-input-row']}>
                <Input
                    label=""
                    name="chatMessage"
                    placeholder="Say something..."
                    control={control}
                    errors={errors}
                />
                <Button
                    icon={<SendIcon />}
                    label=""
                    isIconOnly
                    iconOnlySize={ButtonSizes.SMALL}
                    variant={ButtonVariants.SECONDARY}
                    size={ButtonSizes.FIT}
                />
            </Cluster>
        </section>
    );
};

export { Chat };
