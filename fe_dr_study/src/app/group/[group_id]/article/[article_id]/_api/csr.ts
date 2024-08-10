import { POST, PATCH, DELETE } from '@/app/api/routeModule';
import { articleAPI } from '@/app/api/axiosInstanceManager';
import { CreateCommentContent, UpdateCommentReq } from '../_types/index';

export const postingComment = async (
    articleId: number,
    createCommentBody: CreateCommentContent,
) => {
    try {
        const response = await POST({
            API: articleAPI,
            endPoint: `/${articleId}/comments`,
            body: createCommentBody,
            isAuth: true,
        });
        console.log('postingComment에서 확인용: ', response);
        return response;
    } catch (error) {
        console.error('댓글 생성 실패함 ㅠㅠ ', error);
        throw error;
    }
};

export const updatingComment = async (
    commentId: number,
    updateCommentBody: UpdateCommentReq,
) => {
    try {
        const response = await PATCH({
            API: articleAPI,
            endPoint: `/comments`,
            body: updateCommentBody,
            params: commentId.toString(),
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('댓글 수정 실패함 ㅠㅠ ', error);
        throw error;
    }
};

export const deletingComment = async (commentId: number) => {
    try {
        const response = await DELETE({
            API: articleAPI,
            endPoint: `/comments`,
            params: commentId.toString(),
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('댓글 삭제 실패함 ㅠㅠ ', error);
        throw error;
    }
};

export const deletingArticle = async (articleId: number) => {
    try {
        const response = await DELETE({
            API: articleAPI,
            endPoint: `/`,
            isAuth: true,
            params: articleId.toString(),
        });
        return response;
    } catch (error) {
        console.error('삭제 실패함 ㅠㅠ ', error);
        throw error;
    }
};
