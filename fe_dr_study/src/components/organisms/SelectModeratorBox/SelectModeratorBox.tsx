import ModeratorSearchList from '@/app/group/list/_components/ModeratorSearchList';
import SearchModerator from '@/app/group/list/_components/SearchModerator';
import {
    ModeratorDetail,
    ModeratorList,
} from '@/components/template/moderator/ModeratorTemplate';
import { Moderator } from '@/interfaces/moderator';
import Image from 'next/image';
import React, { useState } from 'react';

interface SelectModeratorBoxProps {
    selectedModerator: Moderator | null;
    setSelectedModerator: React.Dispatch<
        React.SetStateAction<Moderator | null>
    >;
}

const SelectModeratorBox = ({
    selectedModerator,
    setSelectedModerator,
}: SelectModeratorBoxProps) => {
    const [moderatorSearchResult, setModeratorSearchResult] = useState<any[]>(
        [],
    );

    return (
        <div>
            <p className="block text-dr-body-4 ${className} text-left !text-dr-coral-50 pb-[1rem]">
                AI 사회자 선택하기
            </p>

            <div className="pb-[0.5rem]">
                <SearchModerator
                    setModeratorSearchResult={setModeratorSearchResult}
                />
            </div>
            <div className="flex flex-col w-[100%]">
                <ModeratorList
                    moderators={moderatorSearchResult}
                    setSelectedModerator={setSelectedModerator}
                    isDisableCreateNewModerator
                />
                <ModeratorDetail moderator={selectedModerator} />
            </div>
        </div>
    );
};

// const ModeratorList = ({
//     moderators,
//     selectedModerator,
//     handleModeratorSelect,
// }: {
//     moderators: Moderator[];
//     selectedModerator: Moderator | null;
//     handleModeratorSelect: (Moderator: Moderator) => void;
// }) => {
//     return (
//         <div className="flex flex-wrap gap-dr-20 max-h-[14rem] overflow-y-scroll">
//             {moderators?.map((moderator) => (
//                 <div
//                     className={`flex flex-col items-center p-1 cursor-pointer rounded-md ${
//                         selectedModerator?.id === moderator.id
//                             ? 'border border-dr-coral-100' // 선택된 모더레이터의 테두리 스타일
//                             : 'border border-transparent'
//                     }`} // 조건부 스타일
//                     key={moderator.id}
//                     onClick={() => handleModeratorSelect(moderator)} // 클릭 시 선택
//                 >
//                     <div className="relative w-[4rem] h-[4rem] rounded-full overflow-hidden">
//                         <Image
//                             src={
//                                 moderator?.modelType?.startsWith('/')
//                                     ? moderator.modelType
//                                     : `/images/AI_character.jpg`
//                             }
//                             fill
//                             alt="moderator type image"
//                         />
//                     </div>
//                     <p className="text-dr-body-4 py-1 ">{moderator.name}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

const SelectedModerator = ({
    selectedModerator,
}: {
    selectedModerator: Moderator | null;
}) => {
    return (
        <>
            {selectedModerator && (
                <div className="mt-4 border border-dr-coral-100 rounded p-4 animate-popIn">
                    <h3 className="text-dr-body-2 font-semibold pb-2">
                        선택된 AI 사회자 정보
                    </h3>
                    <div className="flex gap-dr-10">
                        <div className="relative w-[6rem] h-[6rem] rounded-full overflow-hidden">
                            <Image
                                src={
                                    selectedModerator?.modelType?.startsWith(
                                        '/',
                                    )
                                        ? selectedModerator.modelType
                                        : `/images/AI_character.jpg`
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
        </>
    );
};

export default SelectModeratorBox;
