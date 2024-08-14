'use client';

import React from 'react';
import { Box } from '@/components/atoms/Box/Box';
import { Heading, Span } from '@/components/atoms';
import { ArticleData } from '../_types';
import ArticleDropdownButton from './ArticleDropdownButton';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { handleArticleDelete } from '../_handler';

const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const utcDate = new Date(date.getTime() - 9 * 60 * 60 * 1000); // 9시간 빼기
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC', // UTC 시간대로 설정
    }).format(utcDate);
};


interface ArticleDetailProps {
    article: ArticleData;
    groupId: number;  // groupId를 props로 받습니다.
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, groupId }) => {
    const currentUser = getSessionStorageItem('memberData') || {};

    const handleDelete = async () => {
        try {
            await handleArticleDelete(article.id);
            alert('게시글이 성공적으로 삭제되었습니다.');
        } catch (error) {
            console.error('게시글 삭제 실패:', error);
        }
    };

    // 디버깅을 위해 console.log 추가
    console.log('currentUser:', typeof currentUser);
    console.log('currentUser.id:', typeof currentUser.id);
    console.log('article.memberInfo.id:', typeof article.memberInfo.id);

    const isAuthor = currentUser.id == article.memberInfo.id;

    console.log('isAuthor:', isAuthor);
    console.log('groupId:', groupId);
    console.log('article:', article);
console.log('user:', currentUser.id);
    console.log('article.memberInfo.id:', article.memberInfo.id);
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
                {currentUser.id ==article.memberInfo.id && (
                    <div className="absolute right-0 text-white">
                        <ArticleDropdownButton
                            articleId={article.id}
                            onDelete={handleDelete}
                            groupId={groupId}  // groupId를 전달합니다.

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
