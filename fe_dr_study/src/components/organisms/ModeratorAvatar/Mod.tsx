'use client';

import { useState } from 'react';

interface ModeratorAvatarProps {}

const ModeratorAvatar = ({}: ModeratorAvatarProps) => {
    const [isModeratorSpeaking, setIsModeratorSpeaking] =
        useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // 사회자 말하도록 하기
    const toggleSpeaking = () => {
        setIsModeratorSpeaking((prev) => !prev);
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transition: 'transform 0.3s ease-in-out',
                transform:
                    isModeratorSpeaking || isHovered
                        ? 'translateX(-50%) scale(1.3)'
                        : 'translateX(-50%) scale(1)',
                borderTopLeftRadius: '20%',
                borderTopRightRadius: '20%',
                transformOrigin: 'bottom',
            }}
        >
            <img
                src={
                    isModeratorSpeaking
                        ? '/images/speaking.png'
                        : '/images/not-speaking.png'
                }
                alt={
                    isModeratorSpeaking
                        ? 'Moderator Speaking'
                        : 'Moderator Not Speaking'
                }
            />
        </div>
    );
};

export default ModeratorAvatar;
