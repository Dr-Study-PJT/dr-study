import { postingArticle } from '../_api/csr';
import { useRouter } from 'next/router';

export const handleArticleSubmit = async (data: any, groupId: number) => {
    try {
        const response = await postingArticle({
            title: data.articleTitle, // form 데이터와 맞추기
            content: data.description, // form 데이터와 맞추기
            studyGroupId: groupId,
            // tags: ,
        });
        alert('게시글이 성공적으로 작성되었습니다.');
    } catch (error) {
        console.error('게시글 작성 실패', error);
        alert('게시글 작성에 실패했습니다.');
    }
};
