'use client';

import React, { useState } from 'react';
import ArticleCommentsList from './ArticleCommentsListCsr';
import ArticleCommentsForm from './ArticleCommentsFormCsr';
import { CommentData, ArticleData } from '../_types';

interface ArticleCommentsProps {
    article: ArticleData;
}

const ArticleComments = ({ article }: ArticleCommentsProps) => {
    const [comments, setComments] = useState<CommentData[]>(
        article.comments || [],
    );

    const handleCommentSubmitted = (comment: CommentData) => {
        console.log(comment); // 콘솔에 comment 출력하여 확인
        if (comment && comment.id) {
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
                articleId={article.id.toString()}
                onCommentSubmitted={handleCommentSubmitted}
                initialContent=""
                imageUrl={article.memberInfo.imageUrl} // 추가
            />
            {comments.length > 0 && <ArticleCommentsList comments={comments} />}
        </div>
    );
};

export default ArticleComments;
