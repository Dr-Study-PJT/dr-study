'use client';

import { use, useEffect, useState } from 'react';
import './mod.css';
import { Button } from '@/components/atoms';
import OpenTotalSummaryButton from './OpenTotalSummaryButton';

interface ModeratorAvatarProps {
    isAvatarSpeaking: boolean;
    timeForAvatarSpeaking: number;
    gptSummaryBySystem: string;
    audioUrl: string;
}

const ModeratorAvatar = ({
    isAvatarSpeaking,
    timeForAvatarSpeaking,
    gptSummaryBySystem,
    audioUrl,
}: ModeratorAvatarProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (isAvatarSpeaking) {
            console.log(
                'isAvatarSpeaking if (true) line => ',
                isAvatarSpeaking,
            );
            setIsHovered(true);
            // audio.play();
        } else {
            console.log(
                'isAvatarSpeaking else (false) line => ',
                isAvatarSpeaking,
            );
            setIsHovered(false);
            // audio.pause(); // 오디오 일시 정지
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

    useEffect(() => {
        console.log('오디오 바로 실행 전');

        if (audioUrl) {
            console.log('audioUrl: ', audioUrl);

            new Audio(audioUrl).play(); // 바로 실행
            console.log('오디오 바로 실행 후');
            setAudio(new Audio(audioUrl));
        }
    }, [audioUrl]);

    useEffect(() => {
        setAudio(
            new Audio(
                'https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/audio/audio_avatar_1.mp3',
            ),
        );
    }, []);

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
            <Button onClick={() => audio?.play()}>오디오 플레이</Button>
        </div>
    );
};

export default ModeratorAvatar;
