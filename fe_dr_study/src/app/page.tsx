import Image from 'next/image';
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { getGroupListBy } from './group/_api/ssr';
import ButtonWithRouter from './group/_components/ButtonWithRouter';
import Link from 'next/link';

const pageStyles = `PAGE-HOME flex flex-col justify-start items-center w-full min-h-full h-max bg-dr-black`;

export default async function HomePage({}: {}) {
    const response_groupList = await getGroupListBy({ page: 1, size: 5 });
    const groupList_content = response_groupList?.content;
    return (
        <div className={pageStyles}>
            <section className="SECTION1-THUMBNAIL relative w-full h-max flex justify-center items-center">
                <div className="relative w-full h-[58vh] flex justify-center items-center overflow-hidden">
                    <Image
                        alt="thumbnail"
                        src="/images/thumbnail.png"
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className="absolute bottom-0 left-[13%] w-[30%]">
                        <Image
                            alt="home model 1"
                            src="/images/home_model1.png"
                            width={300}
                            height={300}
                            objectFit="contain"
                        />
                    </div>
                    <div className="absolute bottom-0 right-[3%] w-[30%]">
                        <Image
                            alt="home model 2"
                            src="/images/home_model2.png"
                            width={300}
                            height={300}
                            objectFit="contain"
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
                <div className="SECTION-BOX w-full bg-dr-black flex flex-col justify-start gap-8">
                    <div className="TITLES justify-start items-end flex flex-row gap-4">
                        <div className="SECTION-TITLE w-max h-max text-dr-header-3 font-bold !text-dr-white">
                            내가 참여중인 스터디.
                        </div>
                        <p className="text-dr-body-4 text-dr-white mb-1">
                            Dr. Study의 인기있는 AI 사회자를 만나보세요.
                        </p>
                        <div className="text-dr-gray-200 flex-grow text-right text-dr-body-4">
                            <Link
                                className="px-2 py-1 hover:text-dr-gray-100 transition-colors duration-200 cursor-pointer self-end"
                                href={'/members/mypage'}
                            >
                                <span className="">더보기</span>
                            </Link>
                        </div>
                    </div>
                    <div className="CONETENTS w-full h-max">
                        <div className="bg-dr-gray-800 rounded-lg">
                            {groupList_content
                                ?.slice(0, 3)
                                .map((group, index) => (
                                    <Link
                                        href={`/group/${group.id}`}
                                        key={index}
                                        passHref
                                    >
                                        <div className="cursor-pointer relative w-full flex items-start justify-between gap-4 mb-4 bg-dr-dark-200 hover:bg-dr-dark-100 transition-all duration-200 rounded-lg h-max min-h-36">
                                            <div className="flex flex-row relative left-[-4.5rem] h-36">
                                                <div className="relative w-36 h-36 mr-4 rounded-full overflow-hidden">
                                                    <Image
                                                        className="pl-[4.5rem]"
                                                        alt={group.name}
                                                        src={group.imageUrl}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <div className="flex items-center relative h-auto overflow-hidden p-2">
                                                    <div className="flex flex-col gap-1 h-full justify-between">
                                                        <div>
                                                            <h3 className="text-dr-header-1 font-semibold text-white">
                                                                {group.name}
                                                            </h3>
                                                            <p className="text-dr-body-4 text-dr-gray-200 ">
                                                                {
                                                                    group.description
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            {group.tags
                                                                .slice(0, 3)
                                                                .map(
                                                                    (
                                                                        tagName,
                                                                        tagIndex,
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                tagIndex
                                                                            }
                                                                            className="px-3 py-[3px] bg-dr-gray-500 text-dr-body-4 rounded-full text-dr-coral-100 cursor-pointer hover:font-bold transition-all duration-200"
                                                                        >
                                                                            {
                                                                                tagName
                                                                            }
                                                                        </span>
                                                                    ),
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 text-dr-gray-200 mt-3 mr-5 text-dr-body-4 min-w-12">
                                                <FaUsers />
                                                <span>
                                                    {group.memberCount} /{' '}
                                                    {group.memberCapacity}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full h-max flex flex-row">
                <section className="SECTION1-THUMBNAIL w-full h-max flex justify-center items-center p-14">
                    <div className="SECTION-BOX w-full bg-dr-black flex flex-col justify-start gap-8">
                        <div className="TITLES justify-start items-end flex flex-row gap-4">
                            <div className="SECTION-TITLE w-max h-max text-dr-header-3 font-bold !text-dr-white">
                                지금 핫한 AI 사회자.
                            </div>
                            <p className="text-dr-body-4 text-dr-white mb-1">
                                Dr. Study의 인기있는 AI 사회자를 만나보세요.
                            </p>
                        </div>
                        <div className="CONETENTS w-full h-max">
                            <div className="bg-dr-gray-800 rounded-lg">
                                {groupList_content
                                    ?.slice(0, 3)
                                    .map((group, index) => (
                                        <Link
                                            href={`/group/${group.id}`}
                                            key={index}
                                            passHref
                                        >
                                            <div className="cursor-pointer relative w-full flex items-start justify-between gap-4 mb-4 bg-dr-dark-200 hover:bg-dr-dark-100 transition-all duration-200 rounded-lg h-max min-h-36">
                                                <div className="flex flex-row relative left-[-4.5rem] h-36">
                                                    <div className="relative w-36 h-36 mr-4 rounded-full overflow-hidden">
                                                        <Image
                                                            className="pl-[4.5rem]"
                                                            alt={group.name}
                                                            src={group.imageUrl}
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />
                                                    </div>
                                                    <div className="flex items-center relative h-auto overflow-hidden p-2">
                                                        <div className="flex flex-col gap-1 h-full justify-between">
                                                            <div>
                                                                <h3 className="text-dr-header-1 font-semibold text-white">
                                                                    {group.name}
                                                                </h3>
                                                                <p className="text-dr-body-4 text-dr-gray-200 ">
                                                                    {
                                                                        group.description
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="flex space-x-2">
                                                                {group.tags
                                                                    .slice(0, 3)
                                                                    .map(
                                                                        (
                                                                            tagName,
                                                                            tagIndex,
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    tagIndex
                                                                                }
                                                                                className="px-3 py-[3px] bg-dr-gray-500 text-dr-body-4 rounded-full text-dr-coral-100 cursor-pointer hover:font-bold transition-all duration-200"
                                                                            >
                                                                                {
                                                                                    tagName
                                                                                }
                                                                            </span>
                                                                        ),
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2 text-dr-gray-200 mt-3 mr-5 text-dr-body-4 min-w-12">
                                                    <FaUsers />
                                                    <span>
                                                        {group.memberCount} /{' '}
                                                        {group.memberCapacity}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        // <div
                                        //     key={index}
                                        //     className="relative flex items-start justify-between gap-4 mb-4 bg-dr-dark-200 rounded-lg h-max"
                                        // >
                                        //     <div className="flex flex-row relative left-[-3rem]">
                                        //         <div className="relative w-28 h-28 mr-4 rounded-full overflow-hidden">
                                        //             <Image
                                        //                 className="pl-[3rem]"
                                        //                 alt={group.name}
                                        //                 src={group.imageUrl}
                                        //                 layout="fill"
                                        //                 objectFit="cover"
                                        //             />
                                        //         </div>
                                        //         <div className="flex items-center relative h-auto overflow-hidden p-2">
                                        //             <div className="flex flex-col gap-1 h-full justify-between">
                                        //                 <div>
                                        //                     <h3 className="text-dr-header-1 font-semibold text-white">
                                        //                         {group.name}
                                        //                     </h3>
                                        //                     <p className="text-dr-body-4 text-dr-gray-200 ">
                                        //                         {
                                        //                             group.description
                                        //                         }
                                        //                     </p>
                                        //                 </div>
                                        //                 <div className="flex space-x-2">
                                        //                     {group.tags.map(
                                        //                         (
                                        //                             tag,
                                        //                             tagIndex,
                                        //                         ) => (
                                        //                             <span
                                        //                                 key={
                                        //                                     tagIndex
                                        //                                 }
                                        //                                 className="px-3 py-[3px] bg-dr-gray-500 text-dr-body-4 rounded-full text-dr-coral-100 cursor-pointer hover:font-bold transition-all duration-200"
                                        //                             >
                                        //                                 {tag}
                                        //                             </span>
                                        //                         ),
                                        //                     )}
                                        //                 </div>
                                        //             </div>
                                        //         </div>
                                        //     </div>
                                        //     <div className="flex items-center space-x-2 text-dr-gray-200 mt-3 mr-5 text-dr-body-4 min-w-12">
                                        //         <FaUsers />
                                        //         <span>
                                        //             {group.memberCount} /{' '}
                                        //             {group.memberCapacity}
                                        //         </span>
                                        //     </div>
                                        // </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="SECTION1-THUMBNAIL w-full h-max flex justify-center items-center p-14">
                    <div className="SECTION-BOX w-full bg-dr-black flex flex-col justify-start gap-8">
                        <div className="TITLES justify-start items-end flex flex-row gap-4">
                            <div className="SECTION-TITLE w-max h-max text-dr-header-3 font-bold !text-dr-white">
                                뜻밖의 스터디 발견.
                            </div>
                            <p className="text-dr-body-4 text-dr-white mb-1">
                                이런 스터디는 어떠신가요?
                            </p>
                        </div>
                        <div className="CONETENTS w-full h-max">
                            <div className="bg-dr-gray-800 rounded-lg">
                                {groupList_content?.map((group, index) => (
                                    <Link
                                        href={`/group/${group.id}`}
                                        key={index}
                                        passHref
                                    >
                                        <div className="cursor-pointer relative w-full flex items-start justify-between gap-4 mb-4 bg-dr-dark-200 hover:bg-dr-dark-100 transition-all duration-200 rounded-lg h-max min-h-36">
                                            <div className="flex flex-row relative left-[-4.5rem] h-36">
                                                <div className="relative w-36 h-36 mr-4 rounded-full overflow-hidden">
                                                    <Image
                                                        className="pl-[4.5rem]"
                                                        alt={group.name}
                                                        src={group.imageUrl}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <div className="flex items-center relative h-auto overflow-hidden p-2">
                                                    <div className="flex flex-col gap-1 h-full justify-between">
                                                        <div>
                                                            <h3 className="text-dr-header-1 font-semibold text-white">
                                                                {group.name}
                                                            </h3>
                                                            <p className="text-dr-body-4 text-dr-gray-200 ">
                                                                {
                                                                    group.description
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            {group.tags
                                                                .slice(0, 3)
                                                                .map(
                                                                    (
                                                                        tagName,
                                                                        tagIndex,
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                tagIndex
                                                                            }
                                                                            className="px-3 py-[3px] bg-dr-gray-500 text-dr-body-4 rounded-full text-dr-coral-100 cursor-pointer hover:font-bold transition-all duration-200"
                                                                        >
                                                                            {
                                                                                tagName
                                                                            }
                                                                        </span>
                                                                    ),
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 text-dr-gray-200 mt-3 mr-5 text-dr-body-4 min-w-12">
                                                <FaUsers />
                                                <span>
                                                    {group.memberCount} /{' '}
                                                    {group.memberCapacity}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    // <div
                                    //     key={index}
                                    //     className="relative flex items-start justify-between gap-4 mb-4 bg-dr-dark-200 rounded-lg h-max"
                                    // >
                                    //     <div className="flex flex-row relative left-[-3rem]">
                                    //         <div className="relative w-28 h-28 mr-4 rounded-full overflow-hidden">
                                    //             <Image
                                    //                 className="pl-[3rem]"
                                    //                 alt={group.name}
                                    //                 src={group.imageUrl}
                                    //                 layout="fill"
                                    //                 objectFit="cover"
                                    //             />
                                    //         </div>
                                    //         <div className="flex items-center relative h-auto overflow-hidden p-2">
                                    //             <div className="flex flex-col gap-1 h-full justify-between">
                                    //                 <div>
                                    //                     <h3 className="text-dr-header-1 font-semibold text-white">
                                    //                         {group.name}
                                    //                     </h3>
                                    //                     <p className="text-dr-body-4 text-dr-gray-200 ">
                                    //                         {group.description}
                                    //                     </p>
                                    //                 </div>
                                    //                 <div className="flex space-x-2">
                                    //                     {group.tags.map(
                                    //                         (tag, tagIndex) => (
                                    //                             <span
                                    //                                 key={
                                    //                                     tagIndex
                                    //                                 }
                                    //                                 className="px-3 py-[3px] bg-dr-gray-500 text-dr-body-4 rounded-full text-dr-coral-100 cursor-pointer hover:font-bold transition-all duration-200"
                                    //                             >
                                    //                                 {tag}
                                    //                             </span>
                                    //                         ),
                                    //                     )}
                                    //                 </div>
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    //     <div className="flex items-center space-x-2 text-dr-gray-200 mt-3 mr-5 text-dr-body-4 min-w-12">
                                    //         <FaUsers />
                                    //         <span>
                                    //             {group.memberCount} /{' '}
                                    //             {group.memberCapacity}
                                    //         </span>
                                    //     </div>
                                    // </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}
