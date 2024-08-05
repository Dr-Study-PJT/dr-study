import React from 'react';
import Image from 'next/image';
import { FaUsers } from 'react-icons/fa';
import { Pagination } from './Pagenation';
import { getGroupListBy, SearchParams } from './_api/ssr';

const pageStyles = `PAGE-HOME flex flex-col justify-start items-center w-full min-h-full h-max bg-dr-black`;

const PAGENATION_SIZE = 10;

export default async function GroupListPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const currentPage = searchParams.page ?? 1;
    const currentTag = searchParams.tagName;
    const name = searchParams.name;
    const pageSize = searchParams.size ?? PAGENATION_SIZE;

    const propsGetAllChatPostCategory: {
        page: number;
        size: number;
        tagName?: string;
        name?: string;
    } = {
        page: currentPage,
        size: pageSize,
    };

    if (currentTag) {
        propsGetAllChatPostCategory.tagName = currentTag;
    }

    if (name) {
        propsGetAllChatPostCategory.name = name;
    }

    const groupList = await getGroupListBy(propsGetAllChatPostCategory);

    // ! 페이징용 게시물수
    const totalCount = groupList.length;
    const totalPage = Math.ceil(totalCount / pageSize);

    return (
        <div className={pageStyles}>
            <section className="SECTION1-THUMBNAIL w-full h-max flex justify-center items-center p-14">
                <div className="SECTION-BOX w-full bg-dr-black flex flex-col justify-start gap-8">
                    <div className="TITLES justify-start items-end flex flex-row gap-4">
                        <div className="SECTION-TITLE w-max h-max text-dr-header-3 font-bold !text-dr-white">
                            스터디 그룹 탐색하기.
                        </div>
                        <p className="text-dr-body-4 text-dr-white mb-1">
                            Dr. Study의 다양한 스터디를 만나보세요
                        </p>
                    </div>
                    <div className="CONETENTS w-full h-max">
                        <div className="bg-dr-gray-800 rounded-lg">
                            {groupList.map((group, index) => (
                                <div
                                    key={index}
                                    className="relative flex items-start justify-between gap-4 mb-4 bg-dr-dark-200 rounded-lg h-max"
                                >
                                    <div className="flex flex-row relative left-[-3rem]">
                                        <div className="relative w-28 h-28 mr-4 rounded-full overflow-hidden">
                                            <Image
                                                className="pl-[3rem]"
                                                alt={group.name}
                                                src="/images/thumbnail.png"
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
                                                        {group.description}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    {group.tags.map(
                                                        (tagName, tagIndex) => (
                                                            <span
                                                                key={tagIndex}
                                                                className="px-3 py-[3px] bg-dr-gray-500 text-dr-body-4 rounded-full text-dr-coral-100 cursor-pointer hover:font-bold transition-all duration-200"
                                                            >
                                                                {tagName}
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
                            ))}
                        </div>
                    </div>
                    <div className="pagination-wrapper flex flex-row bg-dr-dark-100 w-full justify-center items-center">
                        <Pagination
                            currentPage={currentPage}
                            currentTag={currentTag}
                            totalPage={totalPage}
                            pageSize={pageSize}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
