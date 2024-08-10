'use client';

import React from 'react';
import { Box } from '@/components/atoms/Box/Box';
import { Heading, Span } from '@/components/atoms';
import { ArticleData } from '../_types';
import ArticleCommentsForm from './ArticleCommentsFormCsr'; // 추가

const formatDate = (dateString: string | number | Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(dateString));
};

interface ArticleDetailProps {
    article: ArticleData;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
    return (
        <Box className="w-full" variant="articleDetail">
            <Heading
                variant="h2"
                color="white"
                className="flex flex-row justify-center items-center"
            >
                {article.title ? article.title : '제목 없음'}
            </Heading>
            <Box
                variant="articleCreateAtAndViews"
                className="flex flex-row justify-between"
            >
                <p className="text-gray-400 text-sm">
                    {formatDate(article.createdAt)}
                </p>
                <p className="text-gray-400 text-sm">
                    조회수: {article.viewCount}
                </p>
            </Box>
            <div className="w-1/2 border-t border-[#5E658B]"></div>
            <Box variant="articleContentsSection">
                <Span variant="b3" color="white">
                    {article.content}
                </Span>
            </Box>

        </Box>
    );
};

export default ArticleDetail;
