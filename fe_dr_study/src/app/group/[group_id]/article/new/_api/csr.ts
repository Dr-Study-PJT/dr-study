// 게시글 수정 부분...
import { POST } from '@/app/api/routeModule';
import { articleAPI } from '@/app/api/axiosInstanceManager';
import { CreateArticleReq, CreateArticleResponse } from '../_types';
// 조회글에서 필요한 것?? => 댓글 POST, PATCH, DELETE
// 당장 필요한 것?
// 1. Article에 대해서... => ArticleDelete
// 2. Comment에 대해서... => CommentPost, CommentDelete, CommentPatch

//case 1. 생성관련 함수들...
export const postingArticle = async (
    groupId: number,
    createArticleBody: CreateArticleReq,
) => {
    try {
        const response = await POST({
            API: articleAPI,
            endPoint: `${groupId}`,
            body: createArticleBody,
            isAuth: true,
        });
        console.log('PostingArticle response:', response);
        return response.data as CreateArticleResponse;
    } catch (error) {
        console.error('게시글 생성 실패함 ㅠㅠ ', error);
        throw error; // 오류가 발생한 경우 예외를 던집니다.
    }
};