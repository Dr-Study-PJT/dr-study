'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GET } from '@/app/api/routeModule';
import { showToast } from '@/utils/toastUtil';
import { ToastContainer } from 'react-toastify';

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
    const [moderatorQuery, setModeratorQuery] = useState<string>('');

    const isValidInput = (input: string) => {
        const regex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]*$/; // 허용할 문자 정의
        return regex.test(input);
    };

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

        const response = await GET(urlWithFilterQuery, {
            params: '',
            isAuth: true,
            revalidateTime: 0,
        });
        console.log('moderator 검색 결과: ' + response);
        return response;
    };
    // showToast('error', '검색 결과를 가져오는 중 오류가 발생했습니다.');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModeratorQuery(e.target.value); // 입력 값 업데이트
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log('검색어:', moderatorQuery);
        e.preventDefault(); // 기본 제출 이벤트 방지

        // 사용 예
        if (!isValidInput(moderatorQuery)) {
            showToast('error', '유효하지 않은 입력입니다.');
            setModeratorQuery('');
            return;
        }

        try {
            const response = await getModeratorQueryResult({
                size: 5,
                name: moderatorQuery,
                description: moderatorQuery,
            });
            console.log(response);
            setModeratorSearchResult(response?.content); // 검색 결과 업데이트
            setModeratorQuery('');
            if (!response) {
                showToast('error', '검색 결과가 없습니다.');
            }
        } catch (error) {
            console.error('검색 결과를 가져오는 중 오류가 발생했습니다.');
            showToast('error', '검색 결과를 가져오는 중 오류가 발생했습니다.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit} // 폼 제출 이벤트 핸들러 추가
            className="flex flex-row gap-2 border-[1px] rounded-md border-primary outline-dr-gray-400 bg-[#121212] text-dr-white"
        >
            <ToastContainer />
            <div className="relative h-11 w-full">
                <input
                    className="relative h-11 w-full bg-inherit px-2 pl-3 py-1 font-normal text-xs text-left outline-none rounded-md"
                    value={moderatorQuery} // 상태와 연결
                    autoFocus
                    autoComplete="off"
                    required
                    placeholder="태그나 AI 사회자 이름으로 검색해요."
                    onChange={handleInputChange} // 변경 핸들러 연결
                />
                <button
                    type="button" // 버튼 타입을 "button"으로 설정
                    onClick={handleSubmit} // 클릭 시 검색 실행
                    className="absolute right-1 top-3 text-black rounded min-w-fit"
                >
                    <BiSearch className="text-dr-gray-400 h-full mr-1" />
                </button>
            </div>
        </form>
    );
};

export default SearchModerator;
