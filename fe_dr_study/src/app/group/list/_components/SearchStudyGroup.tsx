'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GET } from '@/app/api/routeModule';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toastUtil';

interface SearchStudyGroupProps {
    size: number;
    page: number;
    name: string;
    tagName: string;
}

const SearchStudyGroup = () => {
    const router = useRouter();

    const [studyGroupQuery, setStudyGroupQuery] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] =
        useState<string>(studyGroupQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(studyGroupQuery);
        }, 500); // 500ms 후에 디바운스된 값 설정

        return () => {
            clearTimeout(handler); // 이전 타이머 클리어
        };
    }, [studyGroupQuery]);

    const isValidInput = (input: string) => {
        const regex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]*$/; // 허용할 문자 정의
        return regex.test(input);
    };

    const getStudyQueryResult = async ({
        size,
        page,
        name,
        tagName,
    }: SearchStudyGroupProps) => {
        console.log('getStudyQueryResult 호출');
        const baseUrl = `v1/groups?size=${size}&page=${page}`;
        let urlWithFilterQuery = `${baseUrl}`;

        if (name) {
            urlWithFilterQuery += `&name=${name}`;
        }

        if (tagName) {
            urlWithFilterQuery += `&tagName=${tagName}`;
        }

        router.push(`/group/list?name=${name}&tagName=${tagName}`);

        const response = await GET(urlWithFilterQuery, {
            params: '',
            isAuth: true,
            revalidateTime: 0,
        });
        console.log('study group 검색 결과: ' + response);
        return response;
    };

    useEffect(() => {
        if (debouncedQuery) {
            // 디바운스된 값이 업데이트될 때만 검색 실행
            handleSearch(debouncedQuery);
        }
    }, [debouncedQuery]);

    const handleSearch = async (query: string) => {
        console.log('검색어:', query);

        if (!isValidInput(query)) {
            showToast('error', '유효하지 않은 입력입니다.');
            setStudyGroupQuery('');
            return;
        }

        try {
            const response = await getStudyQueryResult({
                size: 5,
                page: 1,
                name: query,
                tagName: query,
            });
            console.log(response);
            setStudyGroupQuery('');
            if (!response) {
                showToast('error', '검색 결과가 없습니다.');
            }
        } catch (error) {
            console.error('검색 결과를 가져오는 중 오류가 발생했습니다.');
            showToast('error', '검색 결과를 가져오는 중 오류가 발생했습니다.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudyGroupQuery(e.target.value); // 입력 값 업데이트
    };

    return (
        <form
            onSubmit={(e) => e.preventDefault()} // 폼 제출 이벤트 방지
            className="flex flex-row gap-2 border-[1px] rounded-md border-primary outline-dr-gray-400 bg-[#121212] text-dr-white"
        >
            <div className="relative h-11 w-full">
                <input
                    className="relative h-11 w-full bg-inherit px-2 pl-3 py-1 font-normal text-xs text-left outline-none rounded-md"
                    value={studyGroupQuery} // 상태와 연결
                    autoFocus
                    autoComplete="off"
                    required
                    placeholder="스터디 그룹을 검색해요."
                    onChange={handleInputChange} // 변경 핸들러 연결
                />
                <button
                    type="button" // 버튼 타입을 "button"으로 설정
                    onClick={() => handleSearch(studyGroupQuery)} // 클릭 시 검색 실행
                    className="absolute right-1 top-3 text-black rounded min-w-fit"
                >
                    <BiSearch className="text-dr-gray-400 h-full mr-1" />
                </button>
            </div>
        </form>
    );
};

export default SearchStudyGroup;
