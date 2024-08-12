'use client';

import { useEffect, useRef } from 'react';
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
    gptSummaryBySystem,
    conferenceInfo,
}: ModeratorAvatarProps) => {
    const S3_URL = 'https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study';

    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(new Audio());
    const audioSrc = `${S3_URL}/audio/avatar_audio_${conferenceInfo?.id}.mp3`;

    useEffect(() => {
        // console.log(
        //     'conferenceInfo?.moderatorInfo.avatarModelType: ',
        //     conferenceInfo?.moderatorInfo.avatarModelType,
        //     conferenceInfo?.moderatorInfo,
        // );

        // const videoSrc = `${S3_URL}/moderators/preset/videos/video_${conferenceInfo?.moderatorInfo.avatarModelType}_speak.mp4`;
        const videoSrc = `${S3_URL}/moderators/preset/videos/${'A'}_speak.mp4`;

        if (videoRef.current) videoRef.current.src = videoSrc;
        console.log('videoRef:', videoRef?.current?.src);
    }, []);

    useEffect(() => {
        audioRef.current.src = audioSrc;

        const uniqueUrl = `${audioSrc}?t=${new Date().getTime()}`;
        console.log('isAvatarSpeaking if (true) line => ', isAvatarSpeaking);

        if (audioRef.current && videoRef.current && isAvatarSpeaking === true) {
            audioRef.current.src = uniqueUrl;
            audioRef.current.currentTime = 0;
            videoRef.current.currentTime = 0;

            videoRef.current.play();
            audioRef.current.play();

            audioRef.current.onended = () => {
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            };
        }
        // }
    }, [isAvatarSpeaking]);

    // 오디오 테스트용 버튼
    const handleClickPlayAudio = () => {
        const uniqueUrl = `${audioSrc}?t=${new Date().getTime()}`;

        const audio = new Audio(uniqueUrl);
        if (audio) {
            console.log('audio', audio);
            audio.play().catch((error) => {
                console.error('오디오 재생 중 오류 발생:', error);
            });
        }
    };

    return (
        <div className="relative">
            <div
                className={`relative rounded-full overflow-hidden w-40 h-40 bottom-0 left-0 transform border-8 border-dr-coral-400
                ${isAvatarSpeaking ? 'border-dr-coral-500' : 'border-dr-coral-50'}
                `}
                style={{
                    transition: 'transform 0.3s ease-in-out',
                    transform: isAvatarSpeaking
                        ? 'translateX(-50%) scale(1.5) translateY(-30%)'
                        : 'translateX(-50%) scale(1) translateY(40%)',
                }}
            >
                <video
                    ref={videoRef}
                    muted
                    autoPlay={false}
                    className="w-full h-full object-cover bg-dr-white"
                />
                <audio ref={audioRef} className="hidden" />
            </div>

            <div className="absolute top-0 right-0 translate-x-[100%] text-dr-white bg-dr-black bg-opacity-40 text-center p-3 rounded-xl">
                {gptSummaryBySystem}
            </div>
        </div>
    );
};

export default ModeratorAvatar;
