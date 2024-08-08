'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trimString } from '@/utils/trimString';

interface ArticleListContentProps {
    groupId: string;
}

const ArticleListContent: React.FC<ArticleListContentProps> = ({ groupId }) => {
    const [articles, setArticles] = useState<
        IArticleListResponse['data']['content']
    >([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();

    useEffect(() => {
        fetchArticles(currentPage);
    }, [currentPage]);

    const fetchArticles = async (page: number) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/v1/articles/groups/${groupId}?page=${page}&size=5`,
            );
            const data: IArticleListResponse = await response.json();
            setArticles(data.data.content);
            setTotalPages(data.data.totalPages);
        } catch (error) {
            console.error('에러: 게시글 못가져옴;; :', error);
        }
    };

    return (
        <div className="bg-dr-dark-200 p-6 rounded-xl border-[1px] border-dr-gray-500 animate-fadeIn">
            <div className="flex flex-col justify-start gap-4">
                {articles.map((article, index) => (
                    <div
                        onClick={() => {
                            router.push(
                                `/group/${groupId}/article/${article.id ? article.id : index}`,
                            );
                        }}
                        key={article.id ? article.id : index}
                        className="p-4 bg-dr-dark-100 hover:bg-dr-dark-300 transition-colors duration-200 border-[1px] border-dr-gray-500 rounded-lg flex flex-col gap-4 cursor-pointer"
                    >
                        <div className="flex justify-between mb-2">
                            <div className="font-bold text-lg text-white">
                                {article.title}
                            </div>
                            <div className="text-sm text-gray-400">
                                {new Date(
                                    article.createdAt,
                                ).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="text-sm text-gray-300 mb-2 w-2/3">
                            {trimString(article.content, 45)}
                        </div>
                        <div className="flex space-x-2">
                            {article.tags.map((tag, tagIndex) => (
                                <span
                                    key={tagIndex}
                                    className="px-3 py-1 bg-dr-gray-500 text-dr-body-4 rounded-full text-dr-coral-100 cursor-pointer hover:font-bold transition-all duration-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="mt-4 flex justify-center w-full bg-dr-dark-300 py-1 rounded-md border-[1px] border-dr-gray-300">
                    <div className="flex space-x-4">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`text-dr-gray-400 w-6 text-center hover:text-dr-white transition-colors duration-150 ${currentPage === index ? 'text-dr-white' : ''}`}
                                onClick={() => setCurrentPage(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleListContent;

interface ArticleListContentProps {
    groupId: string;
}

export interface IArticleMemberInfo {
    id: number;
    email: string;
    nickname: string;
    imageUrl: string;
    regDate?: string | null;
    leavedDate?: string | null;
    leaved: boolean;
}

export interface IArticleComment {
    id: number;
    content: string;
    createdAt: string;
    memberInfo: IArticleMemberInfo;
}

export interface IArticle {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    viewCount: number;
    memberInfo: IArticleMemberInfo;
    comments: IArticleComment[];
    tags: string[];
}

export interface IArticleListResponse {
    message: string;
    data: {
        totalElements: number;
        totalPages: number;
        pageable: {
            pageNumber: number;
            pageSize: number;
            sort: {
                sorted: boolean;
                empty: boolean;
                unsorted: boolean;
            };
            offset: number;
            paged: boolean;
            unpaged: boolean;
        };
        first: boolean;
        last: boolean;
        sort: {
            sorted: boolean;
            empty: boolean;
            unsorted: boolean;
        };
        size: number;
        content: IArticle[];
        number: number;
        numberOfElements: number;
        empty: boolean;
    };
}