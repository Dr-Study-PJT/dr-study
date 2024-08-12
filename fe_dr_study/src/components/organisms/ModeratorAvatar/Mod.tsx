'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import './mod.css';
import { Button } from '@/components/atoms';
import { ConferenceData } from '@/interfaces/conference';

interface ModeratorAvatarProps {
    isAvatarSpeaking: boolean;
    timeForAvatarSpeaking: number;
    gptSummaryBySystem: string;
    conferenceInfo: ConferenceData | null;
}

const ModeratorAvatar = ({
    isAvatarSpeaking,
    timeForAvatarSpeaking,
    gptSummaryBySystem,
    conferenceInfo,
}: ModeratorAvatarProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const audioRef = useRef<HTMLAudioElement>(new Audio());

    const audioUrl = `https://s3.ap-northeast-2.amazonaws.com/mz-stop/dr-study/audio/avatar_audio_${conferenceInfo?.id}.mp3`;

    const handleClickPlayAudio = () => {
        const uniqueUrl = `${audioUrl}?t=${new Date().getTime()}`;
        audioRef.current.src = uniqueUrl;
        if (audioRef.current) {
            console.log('audioRef.current', audioRef.current);
            audioRef.current.play().catch((error) => {
                console.error('오디오 재생 중 오류 발생:', error);
            });
        }
    };

    useEffect(() => {
        if (isAvatarSpeaking) {
            handleClickPlayAudio();
            setIsHovered(true);
        } else {
            setIsHovered(false);
        }
    }, [isAvatarSpeaking]);

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
