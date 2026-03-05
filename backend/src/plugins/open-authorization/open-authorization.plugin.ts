import fp from 'fastify-plugin';
import { OpenAuthPath, DiscordApiPath } from '~/libs/enums/enums.js';
import { type DiscordUserDto } from '~/libs/types/types.js';
import { authService } from '../../features/auth/auth.js';
import { config } from '~/libs/modules/config/config.js';
import {
    type FastifyInstance,
    type FastifyRequest,
    type FastifyPluginOptions,
} from 'fastify';

const BEARER_PREFIX = 'Bearer ';

const extractDiscordUser = async (token: string): Promise<DiscordUserDto> => {
    const response = await fetch(DiscordApiPath.CURRENT_USER, {
        headers: {
            Authorization: `${BEARER_PREFIX}${token}`,
        },
    });
    return response.json() as Promise<DiscordUserDto>;
};

const oauthCallbackHandler = fp<FastifyPluginOptions>(
    async (fastify: FastifyInstance): Promise<void> => {
        fastify.get(
            OpenAuthPath.DISCORD_CALLBACK,
            async (request: FastifyRequest, reply) => {
                const discordToken =
                    await fastify.discordOAuth2.getAccessTokenFromAuthorizationCodeFlow(
                        request,
                    );

                const discordUser = await extractDiscordUser(
                    discordToken.token.access_token,
                );

                const token = await authService.discordSignIn(discordUser);
                const url = `${config.ENV.APP.CLIENT_DEVELOPMENT_SERVER_URL}lobby?token=${token.token}`;
                reply.redirect(url);
            },
        );
        await Promise.resolve();
    },
);

export { oauthCallbackHandler };
