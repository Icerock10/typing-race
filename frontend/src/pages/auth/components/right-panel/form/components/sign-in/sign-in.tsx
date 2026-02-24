import { useAppForm } from '~/libs/hooks/hooks.js';
import { type UserSignInRequestDto } from '~/libs/types/types.js';
import { Input } from '~/libs/components/components.js';

const SignIn: React.FC = () => {
    const { control, errors } = useAppForm<UserSignInRequestDto>({
        defaultValues: {},
    });
    return (
        <>
            <Input
                label="Email"
                name="email"
                type="text"
                isRequired
                placeholder="you@example.com"
                errors={errors}
                control={control}
            />
            <Input
                label="Password"
                name="password"
                type="password"
                isRequired
                placeholder="*********"
                errors={errors}
                control={control}
            />
        </>
    );
};

export { SignIn };
