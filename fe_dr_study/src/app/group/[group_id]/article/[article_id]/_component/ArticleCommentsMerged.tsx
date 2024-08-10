'use client';

import React, { useState } from 'react';
import ArticleCommentsList from './ArticleCommentsListCsr';
import ArticleCommentsForm from './ArticleCommentsFormCsr';
import { CommentData, ArticleData } from '../_types';

interface ArticleCommentsProps {
    article: ArticleData;
}

export const ArticleComments = ({ article }: ArticleCommentsProps) => {
    const [comments, setComments] = useState<CommentData[]>(
        article.comments || [],
    );

    const handleCommentSubmitted = (comment: CommentData) => {
        if (comment?.data?.commentId) {
            setComments((prevComments) => [...prevComments, comment]);
        } else {
            console.error('Invalid comment:', comment);
        }
    };

    if (!article) {
        return <p>Loading...</p>;
    }

    return (
        <div className="w-full">
            <ArticleCommentsForm
                articleId={article.id}
                onCommentSubmitted={handleCommentSubmitted}
                initialContent=""
                imageUrl={article.memberInfo.imageUrl}
            />
            {comments.length > 0 && <ArticleCommentsList comments={comments} />}
        </div>
    );
};
