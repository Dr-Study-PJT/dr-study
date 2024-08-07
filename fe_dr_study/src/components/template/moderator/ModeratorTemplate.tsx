'use client';

import Image from 'next/image';
import { Moderator } from '@/interfaces/moderator';
import { useEffect, useState } from 'react';
import { GET, POST } from '@/app/api/routeModule';
import { Button } from '@/components/atoms';

const ModeratorTemplate = ({ moderators }: { moderators: Moderator[] }) => {
    const [selectedModerator, setSelectedModerator] =
        useState<Moderator | null>(null);

    return (
        <div className="relative flex py-[3rem] px-[10rem] text-dr-white gap-dr-30">
            <div className="w-3/5 h-full">
                <ModeratorInformation />
                <ModeratorList
                    moderators={moderators}
                    setSelectedModerator={setSelectedModerator}
                    selectedModerator={selectedModerator} // 이 부분 추가
                />
            </div>
            <ModeratorDetail moderator={selectedModerator} />
        </div>
    );
};

const ModeratorInformation = () => {
    return (
        <div className="pt-[2rem] pb-[1rem]">
            <h2 className="text-dr-header-2">AI 사회자 탐색</h2>
            <p className="text-dr-body-4 text-dr-gray-300">
                - 사전 프롬프트로 학습한 내용을 바탕으로 스터디의 진행을
                도와주며, 내용을 요약 정리하고, 개선 방안을 제안, 통계 및 수치와
                같은 시각자료를 제공하는 등의 다양한 역할을 수행합니다.
            </p>
            <p className="text-dr-body-4 text-dr-gray-300">
                - 다양한 외형, 목소리, 어조를 커스터마이즈 할 수 있습니다.
            </p>
            <p className="text-dr-body-4 text-dr-gray-300">
                - 공유자들이 만들어 놓은 AI 사회자를 저장하여 나만의 온라인
                스터디에 활용할 수 있습니다.
            </p>
        </div>
    );
};

const ModeratorList = ({
    moderators,
    setSelectedModerator,
    selectedModerator,
}: {
    moderators: Moderator[];
    setSelectedModerator: (moderator: Moderator | null) => void;
    selectedModerator: Moderator | null;
}) => {
    return (
        <div className="flex flex-wrap justify-center ">
            {moderators?.map((moderator) => (
                <div
                    key={moderator?.id}
                    className={`w-[25%] flex flex-col p-[0.5rem] rounded-md gap-dr-5 items-center cursor-pointer hover:bg-dr-gray-500 transition duration-200 ${
                        selectedModerator?.id === moderator?.id
                            ? 'border-blue-500 highlight' // 강조된 테두리 클래스 추가
                            : 'border-transparent' // 비선택 상태에서는 투명한 테두리
                    } border-2`} // 항상 2px 테두리 유지
                    onClick={() => setSelectedModerator(moderator)}
                >
                    <div className="relative w-full h-[6rem]">
                        <Image
                            src={moderator?.thumbnailUrl}
                            alt={moderator?.name}
                            fill
                            className="rounded-md mb-2"
                        />
                    </div>
                    <p className="text-dr-body-3 text-center">
                        {moderator?.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

const ModeratorDetail = ({ moderator }: { moderator: Moderator | null }) => {
    return (
        <div className="w-2/5 sticky top-1 flex flex-col gap-dr-20 items-center justify-center py-[2rem] h-full">
            <div className="flex flex-col text-center items-center w-[100%] ">
                <div className="relative w-[100%] h-[20rem]">
                    <Image
                        src={
                            moderator?.thumbnailUrl ||
                            'https://plus.unsplash.com/premium_photo-1681466343780-3235b37889b7?q=80&w=2857&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                        alt={moderator?.name || 'sample moderator'}
                        fill
                        className="rounded-md mb-4"
                    />
                </div>
                <div className="py-2 text-dr-header-2">
                    {moderator?.name || 'AI 사회자 이름'}
                </div>
                <div className="flex flex-col justify-center w-[75%]">
                    <div className="flex flex-col justify-between">
                        <p className="my-2 p-2 text-dr-body-4 text-dr-gray-300 border border-dr-gray-300 rounded-md">
                            <span className="block text-dr-body-3 text-dr-gray-100">
                                사전 프롬프트 요약
                            </span>
                            {moderator?.prompt || 'Sample Prompt'}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p>목소리 타입 :</p>
                        <p className="text-dr-body-2">
                            {moderator?.voiceType || 'Sample Voice'}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p>어조 타입 :</p>
                        <p className="text-dr-body-2">
                            {moderator?.characterType || 'Sample Character'}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p>모델 타입 :</p>
                        <p className="text-dr-body-2">
                            {moderator?.modelType || 'Sample Model'}
                        </p>
                    </div>
                </div>
            </div>
            <Button>AI 사회자 저장하기</Button>
        </div>
    );
};

export default ModeratorTemplate;
