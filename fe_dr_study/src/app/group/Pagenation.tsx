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

    const pagingButtons = ['', '', '', '', ''];

    if (currentPage <= 3) {
        pagingButtons[0] = '1';
        pagingButtons[1] = '2';
        pagingButtons[2] = '3';
        pagingButtons[3] = '4';
        pagingButtons[4] = '5';
    } else if (currentPage * 1 + 2 < totalPage * 1) {
        pagingButtons[0] = (currentPage - 2).toString();
        pagingButtons[1] = (currentPage - 1).toString();
        pagingButtons[2] = currentPage.toString();
        pagingButtons[3] = (currentPage * 1 + 1).toString();
        pagingButtons[4] = (currentPage * 1 + 2).toString();
    } else {
        pagingButtons[0] = (totalPage * 1 - 4).toString();
        pagingButtons[1] = (totalPage * 1 - 3).toString();
        pagingButtons[2] = (totalPage * 1 - 2).toString();
        pagingButtons[3] = (totalPage * 1 - 1).toString();
        pagingButtons[4] = (totalPage * 1).toString();
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
                    currentPage - 5 > 0 ? currentPage - 5 : 1
                }&${optionalQueryString}`}
            >
                <button className="p-2 px-2.5 m-2 rounded">{'<'}</button>
            </Link>
            {pagingButtons.map((e: string, idx: number) => (
                <Link href={`posts?page=${e}&${optionalQueryString}`} key={idx}>
                    <button
                        className={`p-2 px-2.5 m-2 rounded  ${
                            currentPage.toString() == e
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
                    totalPage > currentPage * 1 + 5
                        ? currentPage * 1 + 5
                        : totalPage
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
