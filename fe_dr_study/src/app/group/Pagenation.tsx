'use client';

import Link from 'next/link';

export const Pagination = ({
    currentPage,
    currentTag,
    totalPage,
    pageSize,
}: {
    currentPage: number;
    currentTag?: string;
    totalPage: number;
    pageSize: number;
}) => {
    let optionalQueryString = `size=${pageSize}`;

    if (currentTag) {
        optionalQueryString += `&tag=${currentTag}`;
    }

    const pagingButtons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;

    if (endPage > totalPage) {
        endPage = totalPage;
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pagingButtons.push(i.toString());
    }

    return (
        <>
            <div className="md:inline hidden">
                <Link href={`posts?page=1&${optionalQueryString}`}>
                    <button className="p-2 px-2.5 m-2 rounded">{'<<'}</button>
                </Link>
            </div>
            <Link
                href={`posts?page=${
                    currentPage - 1 > 0 ? currentPage - 1 : 1
                }&${optionalQueryString}`}
            >
                <button className="p-2 px-2.5 m-2 rounded">{'<'}</button>
            </Link>
            {pagingButtons.map((e: string, idx: number) => (
                <Link href={`posts?page=${e}&${optionalQueryString}`} key={idx}>
                    <button
                        className={`p-2 px-2.5 m-2 rounded  ${
                            currentPage.toString() === e
                                ? 'text-dr-coral-200'
                                : 'bg-secondary'
                        }`}
                    >
                        {e}
                    </button>
                </Link>
            ))}
            <Link
                href={`posts?page=${
                    currentPage + 1 <= totalPage ? currentPage + 1 : totalPage
                }&${optionalQueryString}`}
            >
                <button className="p-2 px-2.5 m-2 rounded">{'>'}</button>
            </Link>
            <div className="md:inline hidden">
                <Link href={`posts?page=${totalPage}&${optionalQueryString}`}>
                    <button className="p-2 px-2.5 m-2 rounded">{'>>'}</button>
                </Link>
            </div>
        </>
    );
};
