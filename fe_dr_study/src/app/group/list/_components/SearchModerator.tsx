'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GET } from '@/app/api/routeModule';
import { useRouter } from 'next/navigation';

interface SearchModeratorProps {
    size: number;
    name: string;
    description: string;
}

const SearchModerator = ({
    setModeratorSearchResult,
}: {
    setModeratorSearchResult: Dispatch<SetStateAction<any[]>>;
}) => {
    const [searchStudyGroup, setSearchStudyGroup] = useState<string>('');

    const getModeratorQueryResult = async ({
        size,
        name,
        description,
    }: SearchModeratorProps) => {
        console.log('getModeratorQueryResult 호출');
        const baseUrl = `v1/moderators&size=${size}`;
        let urlWithFilterQuery = `${baseUrl}`;

        if (name) {
            urlWithFilterQuery += `&name=${name}`;
        }

        if (description) {
            urlWithFilterQuery += `&description=${description}`;
        }

        try {
            const response = await GET(urlWithFilterQuery);
            console.log('moderator 검색 결과: ' + response);
            return response.data;
        } catch (error) {
            console.log('GET 실패 : 그룹리스트 : 더미데이터로 대체합니다.');
            console.error('에러:' + error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStudyGroup(e.target.value); // 입력 값 업데이트
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log('검색어:', searchStudyGroup);
        e.preventDefault(); // 기본 제출 이벤트 방지

        try {
            const response = await getModeratorQueryResult({
                size: 5,
                name: searchStudyGroup,
                description: searchStudyGroup,
            });
            console.log(response);
            setModeratorSearchResult(response?.content); // 검색 결과 업데이트
        } catch (error) {
            console.error('에러:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit} // 폼 제출 이벤트 핸들러 추가
            className="flex flex-row gap-2 border-[1px] rounded-md border-primary outline-dr-gray-400 bg-[#121212] text-dr-white"
        >
            <div className="relative h-11 w-full">
                <input
                    className="relative h-11 w-full bg-inherit px-2 pl-3 py-1 font-normal text-xs text-left outline-none rounded-md"
                    value={searchStudyGroup} // 상태와 연결
                    autoFocus
                    autoComplete="off"
                    placeholder="태그나 AI 사회자 이름으로 검색해요."
                    onChange={handleInputChange} // 변경 핸들러 연결
                />
                <button
                    type="button" // 버튼 타입을 "button"으로 설정
                    onSubmit={handleSubmit} // 클릭 시 검색 실행
                    className="absolute right-1 top-3 text-black rounded min-w-fit"
                >
                    <BiSearch className="text-dr-gray-400 h-full mr-1" />
                </button>
            </div>
        </form>
    );
};

export default SearchModerator;
