'use client';
import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import LottieCommunity from '../_components/Lotties/Lottie_Community';
import LottieTrending from '../_components/Lotties/Lottie_Trending';
import { Button } from '@/components/atoms';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { StudyGroup } from '@/interfaces/studyGroupQueryResult';
import StudyGroupSearchList from './_components/ModeratorSearchList';
import SearchStudyGroup from './_components/SearchStudyGroup';

const styleTransitionColor = `transition duration-300 ease-in-out`;

export default function PLPLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const [studyGroupSearchResult, setStudyGroupSearchResult] = useState<
        StudyGroup[]
    >([]);

    return (
        <div className="relative flex flex-row justify-center pr-32 gap-4 h-max mb-14">
            <div className="flex flex-col justify-between gap-6 items-center w-10/12 md:w-4/6 mt-16 h-max">
                <div className="filter-title relative flex items-center justify-start w-full h-16">
                    <div
                        className="absolute inset-0 opacity-75 z-0 rounded-lg"
                        style={{
                            backgroundImage: 'url(/title-bg.png)',
                            backgroundSize: '100% auto',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>

                    <div className="TITLES justify-start items-end flex flex-row gap-4 relative text-center animate-fadeIn py-4 px-14">
                        <div className="SECTION-TITLE w-max h-max text-dr-header-3 font-bold !text-dr-white">
                            스터디 그룹 탐색하기.
                        </div>
                        <p className="text-dr-body-4 text-dr-white mb-1">
                            Dr. Study의 다양한 스터디를 만나보세요
                        </p>
                    </div>
                    <LottieCommunity />
                </div>
                {children}
            </div>
            <aside className="mt-40 absolute right-8 hidden lg:block w-48 xl:w-56">
                <div className="flex flex-col justify-start gap-4 h-full">
                    <div className="w-full flex flex-row gap-2">
                        <Button
                            onClick={(e) => {
                                router.push('/group/new');
                            }}
                        >
                            스터디 그룹 만들기
                        </Button>
                    </div>
                    <SearchStudyGroup />
                    {/* <SearchStudyGroup
                        setStudyGroupSearchResult={setStudyGroupSearchResult}
                    />
                    <StudyGroupSearchList
                        studyGroupSearchResult={studyGroupSearchResult}
                    /> */}

                    <div className="pb-4 bg-zinc-900 rounded-md">
                        <div className="w-full border-b-[1px] border-zinc-700 ">
                            <p className="px-3 py-2 !text-sm font-medium !text-left text-white">
                                스터디그룹 인기있는 태그
                            </p>
                        </div>
                        <ul className="px-3 py-2 flex flex-wrap justify-start gap-x-2 gap-y-2">
                            {['태그1', '태그2', '태그3'].map((tagName, i) => (
                                <li key={i}>
                                    <Link
                                        href={`/group?page=1&size=5&tagName=${tagName}`}
                                    >
                                        <button className="h-full inline-flex items-center animate-popIn">
                                            <span
                                                className={`inline-flex items-center !text-xs whitespace-nowrap bg-[#222222] font-normal text-dr-coral-200 h-3/4 my-2 px-2 rounded-full ${styleTransitionColor} hover:!bg-zinc-700`}
                                            >
                                                {tagName}{' '}
                                                <span className="ml-1 text-[0.55rem]">
                                                    1
                                                </span>
                                            </span>
                                        </button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="pb-4 mt-4 bg-zinc-900 rounded-md">
                        <div className="w-full border-b-[1px] border-white dark:border-zinc-700 relative">
                            <LottieTrending />
                            <p className="px-3 py-2 !text-sm font-medium !text-right mr-4 text-white">
                                현재{' '}
                                <span className="text-dr-coral-300 font-bold">
                                    핫한
                                </span>{' '}
                                스터디그룹
                            </p>
                        </div>
                        <div className="my-1">
                            <ul className="flex flex-col gap-4 px-4 py-2">
                                {[
                                    {
                                        title: '더미 면접 스터디 1',
                                        commentCnt: 12,
                                        url: '/group/1',
                                    },
                                    {
                                        title: '더미 면접 스터디 2',
                                        commentCnt: 8,
                                        url: '/group/1',
                                    },
                                    {
                                        title: '더미 면접 스터디 3',
                                        commentCnt: 6,
                                        url: '/group/1',
                                    },
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={item.url}
                                            className={`w-full flex flex-row items-center justify-start gap-3 text-zinc-600 dark:text-zinc-300 hover:!text-zinc-600 ${styleTransitionColor}`}
                                        >
                                            <div className="!text-left text-xs w-3/4">
                                                {item.title.length > 16
                                                    ? item.title.substring(
                                                          0,
                                                          16,
                                                      ) + '..'
                                                    : item.title}
                                            </div>
                                            <div className="w-2/12 flex flex-row gap-1 mt-[1px]">
                                                <FaUsers className="text-dr-gray-400" />{' '}
                                                <span className="text-xs ">
                                                    {item.commentCnt}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
