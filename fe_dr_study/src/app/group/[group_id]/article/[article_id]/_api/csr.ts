import { POST, PATCH, DELETE } from '@/app/api/routeModule';
import { articleAPI } from '@/app/api/axiosInstanceManager';
import { CreateCommentContent, UpdateCommentReq } from '../_types/index';

export const postingComment = async (
    articleId: string,
    createCommentBody: CreateCommentContent,
) => {
    try {
        const response = await POST({
            API: articleAPI,
            endPoint: `/${articleId}/comments`,
            body: createCommentBody,
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('댓글 생성 실패함 ㅠㅠ ', error);
        throw error;
    }
};

export const updatingComment = async (
    commentId: string,
    updateCommentBody: UpdateCommentReq,
) => {
    try {
        const response = await PATCH({
            API: articleAPI,
            endPoint: `/comments`,
            body: updateCommentBody,
            params: commentId,
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('댓글 수정 실패함 ㅠㅠ ', error);
        throw error;
    }
};

export const deletingComment = async (commentId: string) => {
    try {
        const response = await DELETE({
            API: articleAPI,
            endPoint: `/comments`,
            params: commentId,
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('댓글 삭제 실패함 ㅠㅠ ', error);
        throw error;
    }
};

export const deletingArticle = async (articleId: string) => {
    try {
        const response = await DELETE({
            API: articleAPI,
            endPoint: `/`,
            isAuth: true,
            params: articleId,
        });
        return response;
    } catch (error) {
        console.error('삭제 실패함 ㅠㅠ ', error);
        throw error;
    }
};
