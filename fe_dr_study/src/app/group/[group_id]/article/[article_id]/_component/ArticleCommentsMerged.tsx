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

    const handleCommentSubmitted = (newComment: CommentData) => {
        console.log(newComment); // 콘솔에 newComment 출력하여 확인
        if (newComment && newComment.id) {
            setComments((prevComments) => [...prevComments, newComment]);
        } else {
            console.error('Invalid comment:', newComment);
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
            {comments.length > 0 ? (
                <ArticleCommentsList comments={comments} />
            ) : (
                <div>No comments available</div>
            )}
        </div>
    );
};

export default ArticleComments;
