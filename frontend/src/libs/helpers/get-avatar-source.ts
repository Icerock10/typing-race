import { DEFAULT_AVATAR_ICONS } from '~/pages/auth/libs/constants/constants.js';

const getAvatarSource = (avatarName: string): string | undefined => {
    const [avatarFallbackIcon] = DEFAULT_AVATAR_ICONS;
    const avatar = DEFAULT_AVATAR_ICONS.find(({ name }) => name === avatarName);
    return avatar?.src ?? avatarFallbackIcon?.src;
};

export { getAvatarSource };
