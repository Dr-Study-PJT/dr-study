import { GET } from '@/app/api/routeModule';

export const fetchingArticle = async (articleId: string) => {
    'use server';
    console.log('페칭 시도');
    const response = await GET('v1/articles', {
        params: articleId,
        isAuth: true,
    });
    console.log(response); // 확인용
    return response.data;
};

export const fetchingMemberData = async (articleId: number) => {
    'use server';
    console.log('페칭 시도');
    const response = await GET('v1/articles', {
        params: articleId.toString(),
        isAuth: true,
    });
    console.log(response.data.memberInfo); // 확인용
    return response.data.memberInfo;
};

export const fetchingComment = async (articleId: number) => {
    'use server';
    console.log('댓글 읽기 시도'); // 확인용
    const response = await GET('v1/articles', {
        params: articleId.toString(),
        isAuth: true,
    });
    console.log('댓글 읽기 시도는?' + response.data.comments); // 확인용
    return response.data.comments;
};
