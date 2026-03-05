import oauthPlugin, { type ProviderConfiguration } from '@fastify/oauth2';
import { OpenAuthPath } from '~/libs/enums/enums.js';
import { config } from '~/libs/modules/config/config.js';

const DISCORD_OPEN_AUTH_NAME = 'discordOAuth2';
const DISCORD_OPEN_AUTH_SCOPE = ['identify', 'email'];

const { DISCORD_CONFIGURATION } = oauthPlugin as unknown as Record<
    string,
    ProviderConfiguration
>;

const openAuthConfig = {
    discord: {
        name: DISCORD_OPEN_AUTH_NAME,
        credentials: {
            client: {
                id: config.ENV.OPEN_AUTH.DISCORD.CLIENT_ID,
                secret: config.ENV.OPEN_AUTH.DISCORD.CLIENT_SECRET,
            },
            auth: DISCORD_CONFIGURATION,
        },
        scope: DISCORD_OPEN_AUTH_SCOPE,
        startRedirectPath: OpenAuthPath.DISCORD,
        callbackUri: config.ENV.OPEN_AUTH.BASE_CALLBACK_URI,
    },
};

export { openAuthConfig };
