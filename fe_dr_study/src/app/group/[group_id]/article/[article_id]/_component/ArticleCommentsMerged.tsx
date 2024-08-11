'use client';
import React, { useState } from 'react';
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
    const [comments, setComments] = useState<CommentData[]>(
        article.comments || [],
    );

    const handleCommentSubmitted = (newComment: CommentData) => {
        setComments((prevComments) => [...prevComments, newComment]);
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
            {comments.length > 0 && <ArticleCommentsList comments={comments} />}
        </div>
    );
};
