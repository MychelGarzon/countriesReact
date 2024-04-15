import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { funEmoji } from '@dicebear/collection';

function Avatar({ avatarValue }) {
    const avatar = useMemo(() => {
        if (!avatarValue) return null;

        return createAvatar(funEmoji, {
            size: 100,
            seed: avatarValue,
        }).toDataUriSync();
    }, [avatarValue]);

    return <img src={avatar} alt={`Avatar ${avatarValue}`} />;
}

export default Avatar;