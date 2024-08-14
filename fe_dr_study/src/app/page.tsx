import Image from 'next/image';
import { useState } from 'react';
import { getGroupListBy } from './group/_api/ssr';
import ButtonWithRouter from './group/_components/ButtonWithRouter';
import Link from 'next/link';
import GroupCard from './group/list/_components/GroupCard';
import { ModeratorList } from '@/components/template/moderator/ModeratorTemplate';
import { Moderator } from '@/interfaces/moderator';
import { GET } from './api/routeModule';

const pageStyles = `PAGE-HOME flex flex-col justify-start items-center w-full min-h-full h-max bg-dr-black overflow-x-hidden bg-gradient-to-b from-dr-black to-dr-indigo-100`;

export default async function HomePage({}: {}) {
    const response_groupList = await getGroupListBy({ page: 1, size: 5 });
    const groupList_content = response_groupList?.content;

    const fetchModerators = async () => {
        try {
            const response = await GET(`v1/moderators`, {
                params: '',
                isAuth: true,
                revalidateTime: 10,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return []; // 오류 발생 시 빈 배열 반환
        }
    };

    const moderators = await fetchModerators();

    return (
        <div className={pageStyles}>
            <section className="SECTION1-THUMBNAIL relative w-full h-max flex justify-center items-center">
                <div className="relative w-full h-[58vh] flex justify-center items-center overflow-hidden ">
                    <Image
                        alt="thumbnail"
                        src="/images/thumbnail.png"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bottom-0 left-[13%] w-[30%] object-contain">
                        <Image
                            alt="home model 1"
                            src="/images/home_model1.png"
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className="absolute bottom-0 right-[3%] w-[30%] object-contain">
                        <Image
                            alt="home model 2"
                            src="/images/home_model2.png"
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className="absolute inset-0 flex justify-between items-center px-10 mt-16">
                        <div className="text-center text-white max-w-1/2 w-full flex flex-col gap-8 h-full">
                            <h1 className="text-dr-header-3 font-bold mb-2">
                                더 <span className="text-blue-500">간편</span>
                                하게, 더 <span>우수</span>하게
                                <br />
                                감도 높은{' '}
                                <span className="text-blue-500">
                                    AI 온라인 스터디
                                </span>
                            </h1>
                            <div className="flex flex-col gap-1">
                                <p className="text-dr-body-4 text-dr-gray-200">
                                    1200명의 우수한 공유자가 설계한 스터디
                                    시스템에서
                                </p>
                                <p className="text-dr-body-4 text-dr-gray-200">
                                    AI 사회자가 진행하는 온라인 스터디에서
                                    목표를 더 빠르게 성취하세요.
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <ButtonWithRouter></ButtonWithRouter>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="SECTION1-THUMBNAIL w-full h-max flex justify-center items-center p-14">
                <div className="SECTION-BOX w-full  flex flex-col justify-start gap-8">
                    <div className="TITLES justify-start items-end flex flex-row gap-4">
                        <div className="SECTION-TITLE w-max h-max text-dr-header-3 font-bold !text-dr-white ">
                            내가 참여중인 스터디.
                        </div>
                        <p className="text-dr-body-4 text-dr-white mb-1">
                            Dr. Study의 인기있는 AI 사회자를 만나보세요.
                        </p>
                        <div className="text-dr-gray-200 flex-grow text-right text-dr-body-4">
                            <Link
                                className="px-2 py-1 hover:text-dr-gray-100 transition-colors duration-200 cursor-pointer self-end"
                                href={'/group/list'}
                            >
                                <span className="">더보기</span>
                            </Link>
                        </div>
                    </div>
                    <div className="CONETENTS w-full h-max bg-dr-indigo-400 p-4 rounded-xl shadow-md">
                        <div className="rounded-lg w-full">
                            {groupList_content
                                ?.slice(0, 3)
                                .map((group, index) => (
                                    <GroupCard
                                        key={group.id}
                                        id={group.id}
                                        name={group.name}
                                        imageUrl={group.imageUrl}
                                        description={group.description}
                                        createdAt={group.createdAt}
                                        tags={group.tags}
                                        memberCount={group.memberCount}
                                        memberCapacity={group.memberCapacity}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full h-max flex flex-row p-14 gap-14">
                <section className="SECTION1-THUMBNAIL w-full h-max flex justify-center items-center">
                    <div className="SECTION-BOX w-full  flex flex-col justify-start gap-8">
                        <div className="TITLES justify-start items-end flex flex-row gap-4">
                            <div className="SECTION-TITLE w-max h-max text-dr-header-3 font-bold !text-dr-white">
                                지금 핫한 AI 사회자.
                            </div>
                            <p className="text-dr-body-4 text-dr-white mb-1">
                                Dr. Study의 인기있는 AI 사회자를 만나보세요.
                            </p>
                            <div className="text-dr-gray-200 flex-grow text-right text-dr-body-4">
                                <Link
                                    className="px-2 py-1 hover:text-dr-gray-100 transition-colors duration-200 cursor-pointer self-end"
                                    href={'/moderator'}
                                >
                                    <span className="">더보기</span>
                                </Link>
                            </div>
                        </div>
                        <div className="CONETENTS w-full h-max bg-dr-indigo-400 p-4 rounded-xl shadow-md">
                            <div className="bg-dr-gray-800 rounded-lg">
                                <ModeratorList
                                    moderators={moderators.slice(0, 6)}
                                    isDisableCreateNewModerator
                                />
                                {/* {groupList_content
                                    ?.slice(0, 3)
                                    .map((group, index) => (
                                        <GroupCard
                                            key={group.id}
                                            id={group.id}
                                            name={group.name}
                                            imageUrl={group.imageUrl}
                                            description={group.description}
                                            createdAt={group.createdAt}
                                            tags={group.tags}
                                            memberCount={group.memberCount}
                                            memberCapacity={
                                                group.memberCapacity
                                            }
                                        />
                                    ))} */}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="SECTION1-THUMBNAIL w-full h-max flex justify-center items-center">
                    <div className="SECTION-BOX w-full  flex flex-col justify-start gap-8">
                        <div className="TITLES justify-start items-end flex flex-row gap-4">
                            <div className="SECTION-TITLE w-max h-max text-dr-header-3 font-bold !text-dr-white">
                                뜻밖의 스터디 발견.
                            </div>
                            <p className="text-dr-body-4 text-dr-white mb-1">
                                이런 스터디는 어떠신가요?
                            </p>
                        </div>
                        <div className="CONETENTS w-full h-max bg-dr-indigo-400 p-4 rounded-xl shadow-md">
                            <div className="bg-dr-gray-800 rounded-lg">
                                {groupList_content?.map((group, index) => (
                                    <GroupCard
                                        key={group.id}
                                        id={group.id}
                                        name={group.name}
                                        imageUrl={group.imageUrl}
                                        description={group.description}
                                        createdAt={group.createdAt}
                                        tags={group.tags}
                                        memberCount={group.memberCount}
                                        memberCapacity={group.memberCapacity}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}
