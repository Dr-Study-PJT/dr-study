'use client';

import Image from 'next/image';
import { Moderator } from '@/interfaces/moderator';
import { use, useEffect, useRef, useState } from 'react';
import { Button, Label } from '@/components/atoms';
import { useRouter } from 'next/navigation';
import { getBackgroundColorRandomPastel } from '@/utils/colors';
import { FaPlay } from 'react-icons/fa';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import { ErrorLottie } from '@/app/_components/Lottie/Error/ErrorLottie';
import MemberAvatar from '@/components/molecules/MemberAvatar';

const ModeratorTemplate = ({ moderators }: { moderators: Moderator[] }) => {
    const [selectedModerator, setSelectedModerator] =
        useState<Moderator | null>(null);

    console.log('moderators:', moderators);

    return (
        <div className="flex text-dr-white bg-[#1A2036] w-full h-full items-center justify-center gap-3">
            <div className="flex flex-row items-center justify-center w-2/3">
                <section className="AI-LIST-BOX w-full bg-[#242B42] h-[70vh] rounded-2xl flex flex-wrap gap-4 justify-start overflow-y-auto overflow-x-hidden">
                    <ModeratorList
                        moderators={moderators}
                        setSelectedModerator={setSelectedModerator}
                        selectedModerator={selectedModerator}
                    />
                </section>
            </div>
            <section className="AI-DETAIL-BOX w-1/3 min-w-[20vw] bg-[#242B42] border-[1px] border-dr-gray-200 hover:bg-dr-indigo-0 transition-colors duration-300 h-[70vh] rounded-2xl p-12">
                <ModeratorDetail moderator={selectedModerator} />
            </section>
        </div>
    );
};

export const ModeratorList = ({
    moderators,
    setSelectedModerator,
    selectedModerator,
    isDisableCreateNewModerator,
}: {
    moderators: Moderator[];
    setSelectedModerator?: (moderator: Moderator | null) => void;
    selectedModerator?: Moderator | null;
    isDisableCreateNewModerator?: boolean;
}) => {
    const router = useRouter();
    const S3_URL =
        'https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/moderators/preset';

    const handleModeratorSelect = (moderator: Moderator) => {
        if (setSelectedModerator) {
            setSelectedModerator(moderator);
        }
    };

    return (
        <div className="flex flex-col justify-start items-center p-10 w-full">
            {!isDisableCreateNewModerator && (
                <div className="flex flex-row items-end justify-start w-full gap-3 mb-5">
                    <p className="text-dr-header-2 font-semibold text-[#b2bad3] text-start self-start">
                        AI 사회자 목록
                    </p>
                    <div className="text-dr-body-4 text-slate-400 mb-1">
                        간편하게 AI를 탐색해보세요.
                    </div>
                </div>
            )}

            <section className="w-full flex flex-wrap gap-4 justify-start">
                {!isDisableCreateNewModerator && (
                    <div
                        className="AI-CARD bg-[#1A2036] hover:bg-[#202741] shadow-dr-rb-2 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors duration-300"
                        style={{
                            flex: '1 1 calc(20% - 12px)', // 카드가 부모 요소의 크기에 맞춰 유동적으로 배치
                            maxWidth: '200px', // 카드의 최대 크기
                        }}
                        onClick={() => router.push('/moderator/new')}
                    >
                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#242B42] hover:bg-dr-indigo-0 flex items-center justify-center transition-colors duration-300">
                            <p className="text-md text-[#b2bad3] font-semibold">
                                +
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-md text-[#b2bad3] font-semibold">
                                사회자 만들기
                            </p>
                        </div>
                    </div>
                )}

                {moderators.map((moderator) => {
                    return (
                        <div
                            key={moderator.id}
                            className="AI-CARD bg-[#1A2036] hover:bg-dr-indigo-50 cursor-pointer shadow-dr-rb-2 rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-colors duration-300"
                            style={{
                                flex: '1 1 calc(20% - 16px)',
                                maxWidth: '200px', // 카드 최대 크기
                            }}
                            onClick={() => handleModeratorSelect(moderator)} // 클릭 시 선택된 사회자 설정
                        >
                            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                                <div className="relative w-20 h-20 rounded-full overflow-hidden transition-all duration-300">
                                    <Image
                                        className={`transition-colors duration-300 object-cover`}
                                        alt={moderator?.name}
                                        src={
                                            S3_URL +
                                            '/images/' +
                                            moderator.modelType +
                                            '_stop.jpg'
                                        }
                                        unoptimized={true}
                                        fill
                                    />
                                </div>
                                <div className="text-center w-full">
                                    <p className="text-md text-[#b2bad3] font-semibold w-full mb-1">
                                        {moderator?.name}
                                    </p>
                                    <p
                                        className="DESCRIPTION text-dr-body-4 text-[#b2bad3] w-auto"
                                        style={{
                                            wordWrap: 'break-word',
                                            overflowWrap: 'break-word',
                                            wordBreak: 'break-word',
                                            whiteSpace: 'normal',
                                        }}
                                    >
                                        {moderator?.description.slice(0, 25)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};
export const ModeratorDetail = ({
    moderator,
}: {
    moderator: Moderator | null;
}) => {
    if (!moderator) {
        return (
            <div className="text-center text-dr-header-1 font-bold text-[#b2bad3]">
                AI 사회자를 선택해 주세요.
            </div>
        );
    }

    const S3_URL =
        'https://mz-stop.s3.ap-northeast-2.amazonaws.com/dr-study/moderators/preset';
    const videoSrc = `${S3_URL}/videos/${moderator.modelType}_speak.mp4`;
    const audioSrc = `/audios/audio_${moderator.voiceType}${moderator.characterType}.mp3`;

    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = videoSrc;
        }
        if (audioRef.current) {
            audioRef.current.src = audioSrc;
        }
    }, [videoSrc, audioSrc]); // videoSrc와 audioSrc가 변경될 때마다 실행

    const handlePlay = () => {
        if (audioRef.current && videoRef.current) {
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
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 h-full">
            <div className="relative">
                <div className="rounded-full relative overflow-hidden w-32 h-32 border-4 border-dr-indigo-100">
                    <video
                        ref={videoRef}
                        muted
                        className="w-full h-full object-cover"
                        loop
                    />
                    <audio ref={audioRef} className="hidden" />
                </div>
                <button
                    onClick={handlePlay}
                    className={`absolute bottom-0 right-2 text-dr-white p-2 border-4 border-dr-coral-50 bg-dr-coral-300 hover:bg-dr-coral-100 transition-colors duration-300 rounded-full text-dr-body-5 text-center`}
                >
                    <FaPlay />
                </button>
            </div>
            <div className="text-center w-full">
                <p className="text-lg text-[#b2bad3] font-semibold mb-2">
                    {moderator?.name}
                </p>
                <p className="text-dr-body-4 text-[#b2bad3] mb-4">
                    생성 일시:{' '}
                    {new Date(
                        moderator?.createdAt as string,
                    ).toLocaleDateString() || '알 수 없음'}
                </p>

                <div className="flex flex-col gap-2 text-left">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="">AI 사회자 설명</Label>
                        <div className="w-full h-max max-h-18 border-2 border-dr-coral-300 rounded-md p-2  bg-dr-indigo-100 text-dr-body-4 text-[#b2bad3] font-medium cursor-default ">
                            {moderator?.description}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="">사전학습 프롬프트</Label>
                        <div className="w-full h-max max-h-18 border-2 border-dr-coral-200 bg-dr-indigo-100 rounded-lg p-2 text-dr-body-4 text-[#b2bad3] font-medium">
                            {moderator?.prePrompt.slice(0, 30)}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="">아바타 타입</Label>
                        <div className="w-full h-max max-h-18 border-2 border-dr-coral-100 bg-dr-indigo-100 rounded-lg p-2 text-dr-body-3">
                            <div className="flex flex-row w-full justify-between px-2">
                                <p className="text-dr-body-4 text-[#b2bad3]">
                                    <strong>목소리 타입:</strong>{' '}
                                    {moderator?.voiceType || '알 수 없음'}
                                </p>
                                <p className="text-dr-body-4 text-[#b2bad3]">
                                    <strong>어조 타입:</strong>{' '}
                                    {moderator?.characterType || '알 수 없음'}
                                </p>
                                <p className="text-dr-body-4 text-[#b2bad3]">
                                    <strong>모델 타입:</strong>{' '}
                                    {moderator?.modelType || '알 수 없음'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="">공유자</Label>
                        <div className="w-full h-max max-h-18 border-2 border-dr-gray-200  bg-dr-indigo-100 rounded-lg p-2 text-dr-body-3 text-[#b2bad3] font-medium flex flex-row items-center gap-2">
                            <MemberAvatar member={moderator?.creator} />
                            <div>{moderator?.creator?.nickname}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeratorTemplate;
