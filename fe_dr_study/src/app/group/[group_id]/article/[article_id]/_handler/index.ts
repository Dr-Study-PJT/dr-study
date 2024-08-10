'use client';
import {
    postingComment,
    updatingComment,
    deletingComment,
    deletingArticle,
} from '../_api/csr';

export const handleCommentSubmit = async (data: any, articleId: string) => {
    try {
        const response = await postingComment(articleId, {
            content: data.comment_content,
        });
        return response.data;
    } catch (error) {
        console.error('댓글 작성 실패', error);
        throw error;
    }
};

export const handleCommentUpdate = async (
    commentId: string,
    content: string,
) => {
    try {
        await updatingComment(commentId, { content });
    } catch (error) {
        console.error('댓글 수정 실패', error);
    }
};

export const handleCommentDelete = async (commentId: string) => {
    try {
        await deletingComment(commentId);
    } catch (error) {
        console.error('댓글 삭제 실패', error);
    }
};

export const handleArticleDelete = async (articleId: string) => {
    try {
        await deletingArticle(articleId);
        const group_id = 'your_group_id'; // Replace 'your_group_id' with the actual group ID
        // router.push(/group/${group_id});
    } catch (error) {
        console.error('게시글 삭제 실패', error);
    }
};
