'use client';

import Link from 'next/link';
import {
    FaAngleDoubleLeft,
    FaAngleLeft,
    FaAngleRight,
    FaAngleDoubleRight,
} from 'react-icons/fa';

export const Pagination = ({
    currentPage,
    currentTag,
    totalPage,
    pageSize,
    basePath,
}: {
    currentPage: number;
    currentTag?: string;
    totalPage: number | undefined;
    pageSize: number;
    basePath: string;
}) => {
    let optionalQueryString = `size=${pageSize}`;

    if (currentTag) {
        optionalQueryString += `&tag=${currentTag}`;
    }

    const maxButtons = 5;
    let startPage = Math.floor((currentPage - 1) / maxButtons) * maxButtons + 1;
    let endPage = Math.min(startPage + maxButtons - 1, totalPage as number);

    const pagingButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        pagingButtons.push(i);
    }

    return (
        <>
            {(totalPage as number) > 0 && (
                <div className=" flex justify-center w-full h-full bg-dr-indigo-100 rounded-md border-[1px] border-dr-indigo-0 py-3">
                    <div className="flex space-x-4">
                        {currentPage > maxButtons && (
                            <Link
                                href={`${basePath}?page=${startPage - maxButtons}&${optionalQueryString}`}
                            >
                                <button className="text-dr-gray-400 h-full text-center hover:text-dr-white transition-colors duration-150">
                                    <FaAngleDoubleLeft />
                                </button>
                            </Link>
                        )}
                        {currentPage > 1 && (
                            <Link
                                href={`${basePath}?page=${currentPage - 1}&${optionalQueryString}`}
                            >
                                <button className="text-dr-gray-400 h-full text-center hover:text-dr-white transition-colors duration-150">
                                    <FaAngleLeft />
                                </button>
                            </Link>
                        )}
                        {pagingButtons.map((page, idx) => (
                            <Link
                                href={`${basePath}?page=${page}&${optionalQueryString}`}
                                key={idx}
                            >
                                <button
                                    className={`w-6 text-center transition-colors duration-150 ${
                                        parseInt(`${currentPage}`) === page
                                            ? 'text-dr-white'
                                            : 'text-dr-gray-400 hover:text-dr-white'
                                    }`}
                                >
                                    {page}
                                </button>
                            </Link>
                        ))}
                        {currentPage < (totalPage as number) && (
                            <Link
                                href={`${basePath}?page=${parseInt(`${currentPage}`) + 1}&${optionalQueryString}`}
                            >
                                <button className="text-dr-gray-400 h-full text-center hover:text-dr-white transition-colors duration-150">
                                    <FaAngleRight />
                                </button>
                            </Link>
                        )}
                        {endPage < (totalPage as number) && (
                            <Link
                                href={`${basePath}?page=${endPage + 1}&${optionalQueryString}`}
                            >
                                <button className="text-dr-gray-400 h-full text-center hover:text-dr-white transition-colors duration-150">
                                    <FaAngleDoubleRight />
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
