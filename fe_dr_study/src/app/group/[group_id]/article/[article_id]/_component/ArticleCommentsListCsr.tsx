'use client';

import React, { useState, useEffect } from 'react';
import { Box } from '@/components/atoms/Box/Box';
import { Span } from '@/components/atoms';
import { CommentData } from '../_types';
import { handleCommentDelete } from '../_handler/index';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import CommentDropdownButton from './CommentDropdownButton';
import ArticleCommentsEditForm from './ArticleCommentsEditFormCsr';
import Image from 'next/image';

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
    const [editCommentId, setEditCommentId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState<string>('');
    const data = getSessionStorageItem('memberData') || {};

    useEffect(() => {
        setCommentList(comments);
    }, [comments]);

    const updateCommentList = (updatedComment: CommentData) => {
        setCommentList((prev) =>
            prev.map((comment) =>
                comment.id === updatedComment.id
                    ? { ...comment, content: updatedComment.content }
                    : comment,
            ),
        );
        console.log('Updated commentList:', commentList);
    };

    const handleDelete = async (commentId: number) => {
        await handleCommentDelete(commentId);
        setCommentList((prev) =>
            prev.filter((comment) => comment.id !== commentId),
        );
    };

    const handleEditClick = (commentId: number, content: string) => {
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
                                    {comment.memberInfo.imageUrl && (
                                        <Image
                                            src={comment.memberInfo.imageUrl}
                                            alt="author"
                                            width={60}
                                            height={60}
                                            style={{
                                                borderRadius: '50%',
                                                marginRight: '16px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    )}
                                    <Box variant="commentProfileWithNickAndTime">
                                        <Span color="white">
                                            {comment.memberInfo.nickname}
                                        </Span>
                                        <Span color="white">
                                            {formatDate(comment.createdAt)}
                                        </Span>
                                    </Box>
                                </Box>
                                {comment.memberInfo.id === data.id && (
                                    <div className="flex justify-end space-x-2 mt-2">
                                        <CommentDropdownButton
                                            onEdit={() =>
                                                handleEditClick(
                                                    comment.id,
                                                    comment.content,
                                                )
                                            }
                                            onDelete={() =>
                                                handleDelete(comment.id)
                                            }
                                        />
                                    </div>
                                )}
                            </Box>
                            <Box variant="commentText" className="w-full">
                                {editCommentId === comment.id ? (
                                    <ArticleCommentsEditForm
                                        commentId={comment.id}
                                        onCommentUpdated={handleCommentUpdated}
                                        initialContent={editContent}
                                        onCancel={handleCancelEdit}
                                    />
                                ) : (
                                    <Span color="white">{comment.content}</Span>
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
