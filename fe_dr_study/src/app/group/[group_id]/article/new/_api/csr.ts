import { POST, PUT, PATCH, DELETE } from '@/app/api/routeModule';
import { articleAPI } from '@/app/api/axiosInstanceManager';
import {
    Member,
    ArticleData,
    CommentData,
    ICreateArticleReq,
} from '../_types/index';
import { DeleteArticle } from '../../../../../../interfaces/articles';
import { CreateCommentContent } from '../../[article_id]/_types';

// 게시글 작성 부분..
export const CreateArticle = async (createArticleBody: ICreateArticleReq) => {
    try {
        const response = await POST({
            API: articleAPI,
            endPoint: ``,
            body: createArticleBody,
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('createArticle 에러!', error);
    }
};

// 댓글 작성 부분...
export const CreateComment = async (
    // 질문임 createArticleBody: ICreateArticleReq, => 이런 body형태로, { "content" }해야하나? 아니면 params답게 articleId만?
    articleId: number,
    createCommentBody: CreateCommentContent,
) => {
    try {
        const response = await POST({
            API: articleAPI,
            endPoint: `${articleId}/comments`, // 중간에 섞인 {articleId}는 어떻게??..
            body: createCommentBody,
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('creatComment 에러!', error);
    }
};

// 게시글 수정 부분...
