import React from 'react';
import { Pagination } from './Pagenation';
import { getGroupListBy, SearchParams, IGroupListResponse } from '../_api/ssr';
import { ErrorLottie } from '../../_components/Lottie/Error/ErrorLottie';
import GroupCard from './_components/GroupCard';

const pageStyles = `PAGE-HOME flex flex-col justify-start items-center w-full min-h-full h-max bg-dr-indigo-400 rounded-xl border-[1px] border-dr-indigo-100`;

const PAGENATION_SIZE = 5;

export default async function GroupListPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const currentPage = searchParams.page ?? 1;
    const currentTag = searchParams.tagName;
    const name = searchParams.name;
    const pageSize = searchParams.size ?? PAGENATION_SIZE;

    const propsGetGroupListBy: {
        page: number;
        size: number;
        tagName?: string;
        name?: string;
    } = {
        page: currentPage,
        size: pageSize,
    };

    if (currentTag) {
        propsGetGroupListBy.tagName = currentTag;
    }

    if (name) {
        propsGetGroupListBy.name = name;
    }

    const groupListResponse: void | IGroupListResponse =
        await getGroupListBy(propsGetGroupListBy);
    const groupList_content = groupListResponse?.content;
    // 페이징용 게시물 수와 페이지 수
    const totalCount = groupListResponse?.totalElements;
    const totalPage = groupListResponse?.totalPages;

    return (
        <div className={pageStyles}>
            <section className="SECTION1-THUMBNAIL w-full h-max flex justify-center items-center px-14 py-10">
                <div className="SECTION-BOX w-full flex flex-col justify-start gap-8">
                    <div className="CONETENTS w-full h-max flex flex-col items-center">
                        {groupList_content?.length === 0 && (
                            <div className="w-full flex flex-col items-center mb-12">
                                <div className="w-full flex flex-col items-center">
                                    <ErrorLottie />
                                </div>
                                <p className="text-dr-white font-bold text-dr-header-3">
                                    아무것도 없네요!
                                </p>
                            </div>
                        )}
                        <div className="Crounded-lg w-full">
                            {groupList_content?.map((group) => (
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
                    <div className="pagination-wrapper flex flex-row  w-full justify-center items-center">
                        <Pagination
                            basePath="./list"
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
