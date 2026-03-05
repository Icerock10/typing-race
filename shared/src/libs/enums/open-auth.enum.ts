const OpenAuthPath = {
    DISCORD: '/auth/discord',
    DISCORD_CALLBACK: '/auth/discord/callback',
} as const;

const OpenAuthProvider = {
    DISCORD: 'discord',
} as const;

const DiscordApiPath = {
    CURRENT_USER: 'https://discord.com/api/users/@me',
} as const;

export { OpenAuthPath, OpenAuthProvider, DiscordApiPath };
