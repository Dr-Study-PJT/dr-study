'use client';
import { useRouter } from 'next/navigation';
import {
    postingComment,
    updatingComment,
    deletingComment,
    deletingArticle,
    updatingArticle,
} from '../_api/csr';

export const useHandlers = () => {
    const router = useRouter();

    const handleCommentSubmit = async (data: any, articleId: number) => {
        try {
            await postingComment(articleId, {
                content: data.comment_content,
            });
            alert('댓글이 성공적으로 작성되었습니다.');
            // reset();
        } catch (error) {
            console.error('댓글 작성 실패', error);
        }
    };

    const handleCommentUpdate = async (commentId: number, content: string) => {
        try {
            await updatingComment(commentId, { content });
            alert('댓글이 성공적으로 수정되었습니다.');
        } catch (error) {
            console.error('댓글 수정 실패', error);
        }
    };

    const handleCommentDelete = async (commentId: number) => {
        try {
            await deletingComment(commentId);
            alert('댓글이 성공적으로 삭제되었습니다.');
        } catch (error) {
            console.error('댓글 삭제 실패', error);
        }
    };

    const handleArticleDelete = async (articleId: number) => {
        try {
            await deletingArticle(articleId);
            alert('게시글이 성공적으로 삭제되었습니다.');
            const group_id = 'your_group_id'; // Replace 'your_group_id' with the actual group ID
            router.push(`/group/${group_id}`);
        } catch (error) {
            console.error('게시글 삭제 실패', error);
        }
    };

    return {
        handleCommentSubmit,
        handleCommentUpdate,
        handleCommentDelete,
        handleArticleDelete,
    };
};
