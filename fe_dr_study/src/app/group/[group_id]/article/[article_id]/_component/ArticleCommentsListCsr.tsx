'use client';
// ArticleCommentsList.tsx
import React, { useState } from 'react';
import { Box } from '@/components/atoms/Box/Box';
import { Button, Span } from '@/components/atoms';
import { CommentData } from '../_types';
import {
    handleCommentSubmit,
    handleArticleDelete,
    handleCommentDelete,
    handleCommentUpdate,
    // ssr 파일에는 핸들러 달면 안된다고 함... -> 이거 새로 드롭다운 버튼 파서 import 해서 붙이는 식으로
} from '../_handler/index';
const formatDate = (dateString: string | number | Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(dateString));
};

interface ArticleCommentsListProps {
    comments: CommentData[];
}

const ArticleCommentsList: React.FC<ArticleCommentsListProps> = ({
    comments,
}) => {
    const [commentList, setCommentList] = useState([]);

    return (
        <Box variant="articleCommentsListContainer">
            <Box variant="commentPDP">
                {comments.map((comment, index) => (
                    <Box key={index} className="flex flex-row">
                        <div className="w-full flex flex-col">
                            <Box variant="commentPDPHeader">
                                <Box variant="commentProfileLeft">
                                    <img
                                        src={comment.memberInfo.imageUrl ?? ''}
                                        alt="author"
                                        className="flex flex-row justify-center rounded-full w-[60px] h-[60px] mr-2 object-cover"
                                    />
                                    <Box variant="commentProfileWithNickAndTime">
                                        <Span color="white">
                                            {String(
                                                comment.memberInfo.nickname,
                                            )}
                                        </Span>
                                        <Span color="white">
                                            {formatDate(comment.createdAt)}
                                        </Span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box variant="commentText" className="w-full">
                                <Span color="white">
                                    {String(comment.content)}
                                </Span>
                            </Box>
                            <div className="flex justify-end space-x-2 mt-2">
                                <Button
                                    color="red"
                                    onClick={() =>
                                        handleCommentDelete(String(comment.id))
                                    }
                                >
                                    삭제
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        handleCommentUpdate(
                                            String(comment.id),
                                            String(comment.content),
                                        )
                                    }
                                >
                                    수정
                                </Button>
                            </div>
                        </div>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ArticleCommentsList;