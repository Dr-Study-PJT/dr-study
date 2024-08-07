// 관련 게시글 조회임!!! => 이거 Get으로서 필요한것?
//  = comments들이랑 ArticleData들임!
import { GET } from '@/app/api/routeModule';
import { articleAPI, commentAPI } from '@/app/api/axiosInstanceManager';
import { ArticleData } from './_types';
import { ArticleReq } from '../_types/index';

// 기사 가져옴
// articleAPI로서 필요한것들임! -> 질문임!
export const fetchingArticle = async (articleId: number) => {
    'use server';
    console.log('페칭 시도');
    const response = await GET('v1/articles/', {
        params: articleId,
        isAuth: false,
    });
    console.log(response.data); // 확인용
    return response.data;
};

// 댓글 가져옴
// commentAPI로서 필요한것들임! -> 질문임! 이러면 as API를 쓸 수 없잖아...
// 읽기 코멘트
export const fetchingComment = async (articleId: number) => {
    'use server';
    console.log('댓글 읽기 시도'); // 확인용
    const response = await GET('comments', {
        params: articleId,
        isAuth: true,
    });
    console.log('댓글 읽기 시도는?' + response.data.comments); // 확인용
    return response.data.comments;
}; // 각 comments들의 리스트들이 옴.. => 애를 나중에 매핑해야할듯함 ㅇㅇ
