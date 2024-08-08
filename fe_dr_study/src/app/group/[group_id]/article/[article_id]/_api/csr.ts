import { POST, PUT, PATCH, DELETE } from '@/app/api/routeModule';
import { articleAPI } from '@/app/api/axiosInstanceManager';
import {
    ArticleData,
    CreateCommentContent,
    UpdateArticleReq,
    UpdateCommentReq,
} from '../_types/index';

// 조회글에서 필요한 것?? => 댓글 POST, PATCH, DELETE
// 당장 필요한 것?
// 1. Article에 대해서... => ArticleDelete
// 2. Comment에 대해서... => CommentPost, CommentDelete, CommentPatch

//case 1. 생성관련 함수들...
export const postingArticle = async (createArticleBody: ArticleData) => {
    try {
        const response = await POST({
            API: articleAPI,
            endPoint: ``,
            body: createArticleBody,
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('게시글 생성 실패함 ㅠㅠ ', error);
    }
};

export const postingComment = async (
    articleId: number,
    createCommentBody: CreateCommentContent,
) => {
    try {
        const response = await POST({
            API: articleAPI,
            endPoint: `/${articleId}/comments`, // 질문! / 넣어야하나??
            body: createCommentBody,
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('댓글 생성 실패함 ㅠㅠ ', error);
    }
};

//case 2. 수정관련 함수들...
export const updatingArticle = async (
    articleId: number,
    updateArticleBody: UpdateArticleReq,
) => {
    try {
        const response = await PATCH({
            API: articleAPI,
            endPoint: ``,
            body: updateArticleBody,
            params: articleId.toString(), // Convert articleId to string
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('수정 실패함 ㅠㅠ ', error);
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
            params: commentId.toString(), // Convert commentId to string
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('수정 실패함 ㅠㅠ ', error);
    }
};

//case 3. 삭제관련 함수들...
export const deletingArticle = async (articleId: number) => {
    try {
        const response = await DELETE({
            API: articleAPI,
            endPoint: ``,
            // body: aticleData,  => delete는 body가 필요없음!
            isAuth: true,
            params: articleId.toString(), // Convert articleId to string
        });
        return response;
    } catch (error) {
        console.error('삭제 실패함 ㅠㅠ ', error);
    }
};

export const deletingComment = async (commentId: number) => {
    try {
        const response = await DELETE({
            API: articleAPI,
            endPoint: `/comments`, // 질문! / 넣어야하나??
            // body: aticleData,  => delete는 body가 필요없음!
            isAuth: true,
            params: commentId.toString(), // Convert articleId to string
        });
        return response;
    } catch (error) {
        console.error('삭제 실패함 ㅠㅠ ', error);
    }
};
