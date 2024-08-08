import { postingArticle } from '../_api/csr';
import { useRouter } from 'next/router';
import { CreateArticleReq } from '../_types';

export const handleArticleSubmit = async (data: CreateArticleReq) => {
    try {
        const response = await postingArticle({
            title: data.title, // form 데이터와 맞추기
            content: data.content, // form 데이터와 맞추기
            studyGroupId: data.studyGroupId, // form 데이터와 맞추기,
            // tags: ,
        });
        alert('게시글이 성공적으로 작성되었습니다.');
    } catch (error) {
        console.error('게시글 작성 실패', error);
        alert('게시글 작성에 실패했습니다.');
    }
};
