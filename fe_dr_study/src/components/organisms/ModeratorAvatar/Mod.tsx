'use client';

import { useEffect, useState } from 'react';
import './mod.css';

interface ModeratorAvatarProps {
    isAvatarSpeaking: boolean;
    timeForAvatarSpeaking: number;
    gptSummaryBySystem: string;
}

const ModeratorAvatar = ({
    isAvatarSpeaking,
    timeForAvatarSpeaking,
    gptSummaryBySystem,
}: ModeratorAvatarProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        if (isAvatarSpeaking) {
            console.log(
                'isAvatarSpeaking if (true) line => ',
                isAvatarSpeaking,
            );
            setIsHovered(true);
        } else {
            console.log(
                'isAvatarSpeaking else (false) line => ',
                isAvatarSpeaking,
            );
            setIsHovered(false);
        }
    }, [isAvatarSpeaking, timeForAvatarSpeaking]);

    useEffect(() => {
        console.log(
            'setIsHovered: ',
            '\n isAvatarSpeaking:',
            isAvatarSpeaking,
            '\n timeForAvatarSpeaking:',
            timeForAvatarSpeaking,
        );
    }, [setIsHovered]);

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
                className={isAvatarSpeaking ? 'rotating' : ''}
                style={{
                    animationDuration: `${timeForAvatarSpeaking * 1000}ms`, // 애니메이션 지속 시간 설정
                }}
            />
            <div className="absolute top-0 right-0 translate-x-[100%] text-dr-white bg-dr-black bg-opacity-40 text-center p-3 rounded-xl">
                {gptSummaryBySystem}
            </div>
        </div>
    );
};

export default ModeratorAvatar;
