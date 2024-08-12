'use client';

import React from 'react';
import { Box } from '@/components/atoms/Box/Box';
import { Heading, Span } from '@/components/atoms';
import { ArticleData } from '../_types';
import ArticleDropdownButton from './ArticleDropdownButton';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { handleArticleDelete } from '../_handler';

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
    const currentUser = getSessionStorageItem('memberData');

    const handleDelete = async () => {
        try {
            await handleArticleDelete(article.id);
            alert('게시글이 성공적으로 삭제되었습니다.');
            window.location.href = `/group/${article.studyGroupId}`;
        } catch (error) {
            console.error('게시글 삭제 실패:', error);
        }
    };

    const isAuthor = currentUser && currentUser.id === article.memberInfo.id;
    const groupId = article.studyGroupId || 0;

    return (
        <Box className="w-full" variant="articleDetail">
            <div className="relative w-full flex flex-row justify-center items-center">
                <Heading
                    variant="h2"
                    color="white"
                    className="flex justify-center items-center"
                >
                    {article.title ? article.title : '제목 없음'}
                </Heading>
                {isAuthor && groupId !== 0 && (
                    <div className="absolute right-0 text-white">
                        <ArticleDropdownButton
                            groupId={groupId}
                            articleId={article.id}
                            onDelete={handleDelete}
                        />
                    </div>
                )}
            </div>

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
