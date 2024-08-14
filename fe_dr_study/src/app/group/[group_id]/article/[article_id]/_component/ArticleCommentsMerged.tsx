'use client';
import React, { useState, useEffect } from 'react';
import ArticleCommentsList from './ArticleCommentsListCsr';
import ArticleCommentsForm from './ArticleCommentsFormCsr';
import { CommentData, ArticleData, Member } from '../_types';

interface ArticleCommentsProps {
    article: ArticleData;
    memberInfo: Member;
}

export const ArticleComments = ({
    article,
    memberInfo,
}: ArticleCommentsProps) => {
    const [comments, setComments] = useState<CommentData[]>([]);

    useEffect(() => {
        setComments(article.comments || []);
    }, [article.comments]);

    const handleCommentSubmitted = (newComment: CommentData) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    const handleCommentDeleted = (commentId: number) => {
        setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId),
        );
    };

    return (
        <div className="w-full">
            <ArticleCommentsForm
                articleId={article.id}
                onCommentSubmitted={handleCommentSubmitted}
                initialContent=""
                imageUrl={article.memberInfo.imageUrl}
                memberInfo={memberInfo}
                setComments={setComments}
            />
            {comments.length > 0 && (
                <ArticleCommentsList
                    comments={comments}
                    onDelete={handleCommentDeleted} // 추가된 부분
                />
            )}
        </div>
    );
};
