import { jwtVerify, SignJWT } from 'jose';

type JwtPayload = {
    expirationTime: string;
    issuedAt: string;
    userId: string;
};

type Constructor = {
    duration: string;
    encryption: string;
    secret: Uint8Array;
};

const SECONDS_TO_MILLISECONDS = 1000;
const DEFAULT_TIMESTAMP_SECONDS = 0;

class BaseToken {
    private readonly duration: string;
    private readonly encryption: string;
    private readonly secret: Uint8Array;

    constructor({ duration, encryption, secret }: Constructor) {
        this.duration = duration;
        this.encryption = encryption;
        this.secret = secret;
    }

    async decode(token: string): Promise<JwtPayload> {
        const { payload } = await jwtVerify(token, this.secret);

        return {
            expirationTime: new Date(
                (payload.exp ?? DEFAULT_TIMESTAMP_SECONDS) *
                    SECONDS_TO_MILLISECONDS,
            ).toISOString(),
            issuedAt: new Date(
                (payload.iat ?? DEFAULT_TIMESTAMP_SECONDS) *
                    SECONDS_TO_MILLISECONDS,
            ).toISOString(),
            userId: String(payload['userId']),
        };
    }

    async generate(userId: string): Promise<string> {
        return await new SignJWT({ userId })
            .setProtectedHeader({ alg: this.encryption })
            .setIssuedAt()
            .setExpirationTime(this.duration)
            .sign(this.secret);
    }
}

export { BaseToken };
