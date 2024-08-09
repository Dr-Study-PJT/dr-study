'use client';

import { use, useEffect, useState } from 'react';
import './mod.css';

interface ModeratorAvatarProps {
    summaryMessages: string[];
    isAvatarSpeaking: boolean;
    timeForAvatarSpeaking: number;
    gptSummaryBySystem: string;
    audioUrl: string;
}

const ModeratorAvatar = ({
    summaryMessages,
    isAvatarSpeaking,
    timeForAvatarSpeaking,
    gptSummaryBySystem,
    audioUrl,
}: ModeratorAvatarProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(
        new Audio(
            'https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/audio/audio_avatar_1.mp3',
        ),
    );

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
        audioUrl && console.log('오디오 파일 경로 => audioUrl: ', audioUrl);
    }, [audioUrl]);

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
            <button onClick={() => audio?.play()}>플레이</button>
            {summaryMessages.map((message, index) => (
                <div
                    key={index}
                    className="absolute top-0 left-0 translate-x-[-100%] text-dr-white bg-dr-black bg-opacity-40 text-center p-3 rounded-xl"
                >
                    {message}
                </div>
            ))}
            <div className="hidden">
                <audio
                    controls
                    src={`${audioUrl} || https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/audio/audio\_avatar\_1.mp3`}
                    preload="auto"
                    id="audio_player"
                ></audio>
            </div>
        </div>
    );
};

export default ModeratorAvatar;
