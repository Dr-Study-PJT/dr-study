'use client';

import React, { useState } from 'react';
import { Box } from '@/components/atoms/Box/Box';
import { Span } from '@/components/atoms';
import { CommentData } from '../_types';
import { handleCommentDelete } from '../_handler/index';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import ArticleDropdownButtonComponent from './ArticleDropdownButton';
import ArticleCommentsEditForm from './ArticleCommentsEditFormCsr';

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
    const [commentList, setCommentList] = useState<CommentData[]>(comments);
    const [editCommentId, setEditCommentId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState<string>('');
    const data = getSessionStorageItem('memberData') || {};

    const updateCommentList = (updatedComment: CommentData) => {
        setCommentList((prev) =>
            prev.map((comment) =>
                comment.id === updatedComment.id ? updatedComment : comment,
            ),
        );
    };

    const handleDelete = async (commentId: string) => {
        await handleCommentDelete(commentId);
        setCommentList((prev) =>
            prev.filter((comment) => comment.id !== commentId),
        );
    };

    const handleEditClick = (commentId: string, content: string) => {
        setEditCommentId(commentId);
        setEditContent(content);
    };

    const handleCancelEdit = () => {
        setEditCommentId(null);
    };

    const handleCommentUpdated = (updatedComment: CommentData) => {
        updateCommentList(updatedComment);
        setEditCommentId(null);
    };

    return (
        <Box variant="articleCommentsListContainer">
            <Box variant="commentPDP">
                {commentList.map((comment, index) => (
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
                                {comment.memberInfo.id.toString() ===
                                    data.id?.toString() && (
                                    <div className="flex justify-end space-x-2 mt-2">
                                        <ArticleDropdownButtonComponent
                                            onEdit={() =>
                                                handleEditClick(
                                                    String(comment.id),
                                                    comment.content,
                                                )
                                            }
                                            onDelete={() =>
                                                handleDelete(String(comment.id))
                                            }
                                        />
                                    </div>
                                )}
                            </Box>
                            <Box variant="commentText" className="w-full">
                                {editCommentId === String(comment.id) ? (
                                    <ArticleCommentsEditForm
                                        commentId={String(comment.id)}
                                        onCommentUpdated={handleCommentUpdated}
                                        initialContent={editContent}
                                        onCancel={handleCancelEdit} // 취소 핸들러 추가
                                    />
                                ) : (
                                    <Span color="white">
                                        {String(comment.content)}
                                    </Span>
                                )}
                            </Box>
                        </div>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ArticleCommentsList;
