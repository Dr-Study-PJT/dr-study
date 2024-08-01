'use client';

import { useEffect, useState } from 'react';

interface ModeratorAvatarProps {
    isAvatarSpeaking: boolean;
    gptSummaryBySystem: string;
}

const ModeratorAvatar = ({
    isAvatarSpeaking,
    gptSummaryBySystem,
}: ModeratorAvatarProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transition: 'transform 0.3s ease-in-out',
                transform:
                    isAvatarSpeaking || isHovered
                        ? 'translateX(-50%) scale(1.3)'
                        : 'translateX(-50%) scale(1)',
                borderTopLeftRadius: '20%',
                borderTopRightRadius: '20%',
                transformOrigin: 'bottom',
            }}
        >
            <img
                src={
                    isAvatarSpeaking
                        ? '/images/speaking.png'
                        : '/images/not-speaking.png'
                }
                alt={
                    isAvatarSpeaking
                        ? 'Moderator Speaking'
                        : 'Moderator Not Speaking'
                }
            />
            <div className="absolute top-0 right-0 translate-x-[100%] text-dr-white bg-dr-black bg-opacity-40 text-center p-3 rounded-xl">
                {gptSummaryBySystem}
            </div>
        </div>
    );
};

export default ModeratorAvatar;
