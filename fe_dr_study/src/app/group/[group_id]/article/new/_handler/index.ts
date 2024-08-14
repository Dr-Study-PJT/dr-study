import { postingArticle } from '../_api/csr';
import { useRouter } from 'next/router';
import { CreateArticleReq } from '../_types';

export const handleArticleSubmit = async (data: CreateArticleReq, groupId: number) => {
    try {
        const response = await postingArticle(groupId, {
            title: data.title, // form 데이터와 맞추기
            content: data.content, // form 데이터와 맞추기
            // studyGroupId: groupId,
            // tags: ,
        });

        if (response && response.data && response.data.articleId) {
            alert('게시글이 성공적으로 작성되었습니다.');
            return response;
        } else {
            throw new Error('게시글 작성 실패');
        }
    } catch (error) {
        console.error('게시글 작성 실패', error);
        alert('게시글 작성에 실패했습니다.');
        throw error; // 오류가 발생한 경우 예외를 던집니다.
    }
};