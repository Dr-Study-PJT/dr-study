import Image from 'next/image';
import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { Pagination } from './Pagenation';
import { getGroupListBy, SearchParams, IGroupListResponse } from '../_api/ssr';
import { ErrorLottie } from '../../_components/Lottie/Error/ErrorLottie';

const pageStyles = `PAGE-HOME flex flex-col justify-start items-center w-full min-h-full h-max bg-dr-black rounded-xl border-[1px] border-dr-gray-400`;

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
            <section className="SECTION1-THUMBNAIL w-full h-max flex justify-center items-center p-14">
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
                        <div className="bg-dr-gray-800 rounded-lg w-full">
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
                                                            {group.description}
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
