import { Moderator } from '@/interfaces/moderator';
import Image from 'next/image';
import React, { useState } from 'react';

interface SelectModeratorBoxProps {
    moderators: Moderator[]; // 사회자 리스트
}

const SelectModeratorBox = ({ moderators }: SelectModeratorBoxProps) => {
    const tempModerators = [
        {
            id: 1,
            name: 'AI모델 A',
            voiceType: '남성',
            characterType: '친절',
            modelType: '모델1',
            thumbnailUrl: '/images/AI_character.jpg',
        },
        {
            id: 2,
            name: 'AI모델 B',
            voiceType: '여성',
            characterType: '친절',
            modelType: '모델2',
            thumbnailUrl: '/images/AI_character.jpg',
        },
        {
            id: 3,
            name: 'AI모델 C',
            voiceType: '남성',
            characterType: '친절',
            modelType: '모델3',
            thumbnailUrl: '/images/AI_character.jpg',
        },
        {
            id: 3,
            name: 'AI모델 C',
            voiceType: '남성',
            characterType: '친절',
            modelType: '모델3',
            thumbnailUrl: '/images/AI_character.jpg',
        },
        {
            id: 3,
            name: 'AI모델 C',
            voiceType: '남성',
            characterType: '친절',
            modelType: '모델3',
            thumbnailUrl: '/images/AI_character.jpg',
        },
        {
            id: 3,
            name: 'AI모델 C',
            voiceType: '남성',
            characterType: '친절',
            modelType: '모델3',
            thumbnailUrl: '/images/AI_character.jpg',
        },
        {
            id: 3,
            name: 'AI모델 C',
            voiceType: '남성',
            characterType: '친절',
            modelType: '모델3',
            thumbnailUrl: '/images/AI_character.jpg',
        },
        {
            id: 3,
            name: 'AI모델 C',
            voiceType: '남성',
            characterType: '친절',
            modelType: '모델3',
            thumbnailUrl: '/images/AI_character.jpg',
        },
        {
            id: 3,
            name: 'AI모델 C',
            voiceType: '남성',
            characterType: '친절',
            modelType: '모델3',
            thumbnailUrl: '/images/AI_character.jpg',
        },
        {
            id: 3,
            name: 'AI모델 C',
            voiceType: '남성',
            characterType: '친절',
            modelType: '모델3',
            thumbnailUrl: '/images/AI_character.jpg',
        },
    ];

    const [selectedModerator, setSelectedModerator] = useState<
        null | (typeof tempModerators)[0]
    >(null);

    const handleModeratorSelect = (moderator: (typeof tempModerators)[0]) => {
        setSelectedModerator(moderator);
    };

    return (
        <div>
            <p className="text-dr-header-2 pb-2">AI 사회자 선택하기</p>
            <div className="flex flex-wrap gap-dr-20 justify-center h-[14rem] overflow-y-scroll">
                {tempModerators?.map((moderator) => (
                    <div
                        className={`flex flex-col items-center p-1 cursor-pointer rounded-md ${
                            selectedModerator?.id === moderator.id
                                ? 'border border-dr-coral-100' // 선택된 모더레이터의 테두리 스타일
                                : ''
                        }`} // 조건부 스타일
                        key={moderator.id}
                        onClick={() => handleModeratorSelect(moderator)} // 클릭 시 선택
                    >
                        <div className="relative w-[7rem] h-[7rem] rounded-full overflow-hidden">
                            <Image
                                src={
                                    moderator.thumbnailUrl ||
                                    '/images/AI_character.jpg'
                                }
                                fill
                                alt="moderator type image"
                            />
                        </div>
                        <p className="text-dr-body-3 py-1">{moderator.name}</p>
                    </div>
                ))}
            </div>

            {selectedModerator && (
                <div className="mt-4 border border-dr-coral-100 rounded p-4">
                    <h3 className="text-dr-body-2 font-semibold pb-2">
                        선택된 AI 사회자 정보
                    </h3>
                    <div className="flex gap-dr-10">
                        <div className="relative w-[6rem] h-[6rem] rounded-full overflow-hidden">
                            <Image
                                src={
                                    selectedModerator.thumbnailUrl ||
                                    '/images/AI_character.jpg'
                                }
                                fill
                                alt="moderator type image"
                            />
                        </div>
                        <div className="flex flex-col justify-center text-dr-body-3">
                            <p>이름 : {selectedModerator.name}</p>
                            <p>음성 : {selectedModerator.voiceType}</p>
                            <p>어조 : {selectedModerator.characterType}</p>
                            <p>모델 : {selectedModerator.modelType}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectModeratorBox;
