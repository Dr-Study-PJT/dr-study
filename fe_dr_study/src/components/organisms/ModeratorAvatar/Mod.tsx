'use client';

import { useEffect, useRef, useState } from 'react';
import { ConferenceData } from '@/interfaces/conference';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ModeratorAvatarProps {
    conferenceInfo: ConferenceData | null;
}

const ModeratorAvatar = ({ conferenceInfo }: ModeratorAvatarProps) => {
    const S3_URL = 'https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study';

    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(new Audio());
    const audioSrc = `${S3_URL}/audio/avatar_audio_${conferenceInfo?.id}.mp3`;
    const videoSrc = `${S3_URL}/moderators/preset/videos/${'A'}_speak.mp4`;

    const isAvatarSpeaking = useSelector(
        (state: RootState) => state.isAvatarSpeaking.isAvatarSpeaking,
    );
    const avatarDialogue = useSelector(
        (state: RootState) => state.avatarDialogueSlice.avatarDialogueSlice,
    );

    const [displayedText, setDisplayedText] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!avatarDialogue || avatarDialogue === undefined) return; // avatarDialogue가 undefined이거나 존재하지 않으면 실행하지 않음

        let index = 0;
        setDisplayedText(''); // 이전 텍스트 초기화

        const interval = setInterval(() => {
            if (index < avatarDialogue.length) {
                // avatarDialogue의 문자 추가 시 undefined를 걸러냄
                const char = avatarDialogue[index];
                if (char !== undefined) {
                    setDisplayedText((prev) => prev + char);
                }
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50); // 50ms 간격으로 한 글자씩 출력

        return () => clearInterval(interval);
    }, [avatarDialogue]);

    useEffect(() => {
        if (videoRef.current) videoRef.current.src = videoSrc;
    }, []);

    useEffect(() => {
        audioRef.current.src = audioSrc;

        if (videoRef.current) {
            videoRef.current.src = videoSrc;
        }

        const uniqueUrl = `${audioSrc}?t=${new Date().getTime()}`;
        console.log('isAvatarSpeaking:', isAvatarSpeaking);

        if (audioRef.current && videoRef.current && isAvatarSpeaking === true) {
            audioRef.current.src = uniqueUrl;
            audioRef.current.currentTime = 0;
            videoRef.current.currentTime = 0;

            videoRef.current.play();
            audioRef.current.play();
        }

        if (!isAvatarSpeaking) {
            audioRef.current.onended = () => {
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            };
        }
    }, [isAvatarSpeaking]);

    const truncatedText =
        displayedText && displayedText.length > 6 && !isHovered
            ? `${displayedText.slice(0, 6)}...`
            : displayedText;

    return (
        <div
            className="relative"
            style={{
                transition: 'transform 0.3s ease-in-out',
                transform: isAvatarSpeaking
                    ? 'translateX(-50%) translateY(-30%)'
                    : 'translateX(-50%) translateY(40%)',
            }}
        >
            {displayedText && (
                <div
                    className="relative z-30 h-20"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        transition: 'all 0.3s ease-in-out',
                    }}
                >
                    <div
                        className={`absolute left-[100%] min-h-11 ${
                            isHovered ? 'max-w-full' : 'max-w-24'
                        } w-max min-w-20 text-dr-body-4 text-dr-white bg-dr-black bg-opacity-70 text-left p-4 rounded-xl z-20 
                    before:absolute before:bg-opacity-70 before:-bottom-[10px] before:left-4 before:border-[8px] before:border-transparent 
                    before:border-t-dr-black before:border-l-dr-black before:transform before:-translate-x-1/3 before:translate-y-1 before:opacity-70 animate-popIn transition-all duration-300`}
                    >
                        {truncatedText}
                    </div>
                </div>
            )}
            <div
                className={`relative rounded-full overflow-hidden w-40 h-40 bottom-0 left-0 transform border-8 border-dr-coral-400 transition-all duration-300
            ${isAvatarSpeaking ? 'border-dr-coral-500 animate-pulseScale' : 'border-slate-300 transition-all duration-300 '}
        `}
                style={{
                    transition: 'transform 0.3s ease-in-out',
                    transform: isAvatarSpeaking ? 'scale(1.5)' : 'scale(1)',
                }}
            >
                <video
                    ref={videoRef}
                    muted
                    loop
                    autoPlay={false}
                    className="w-full h-full object-cover bg-dr-white"
                />
                <audio ref={audioRef} className="hidden" />
            </div>
        </div>
    );
};

export default ModeratorAvatar;
