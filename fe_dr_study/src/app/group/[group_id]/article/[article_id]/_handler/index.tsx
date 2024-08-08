'use client'
import {
    postingComment,
    updatingComment,
    deletingComment,
    deletingArticle,
    updatingArticle,
} from '../_api/csr';
import { useRouter } from 'next/navigation';

    const router = useRouter();
    
// 생성 페이지
export const handleCommentSubmit = async (data: any, articleId: number) => {
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

// 게시글 조회 페이지
export const handleCommentUpdate = async (
    commentId: number,
    content: string,
) => {
    try {
        await updatingComment(commentId, { content });
        alert('댓글이 성공적으로 수정되었습니다.');
    } catch (error) {
        console.error('댓글 수정 실패', error);
    }
};

export const handleCommentDelete = async (commentId: number) => {
    try {
        await deletingComment(commentId);
        alert('댓글이 성공적으로 삭제되었습니다.');
    } catch (error) {
        console.error('댓글 삭제 실패', error);
    }
};

export const handleArticleDelete = async (articleId: number) => {
    try {
        await deletingArticle(articleId);
        alert('게시글이 성공적으로 삭제되었습니다.');
        const group_id = 'your_group_id'; // 질문! Replace 'your_group_id' with the actual group ID
        router.push(`/group/${group_id}`);
    } catch (error) {
        console.error('게시글 삭제 실패', error);
    }
};

// export const handleArticleEdit = async (articleId: number) => {
//     try {
//         await updatingArticle(articleId, { content:  });
//         alert('게시글이 성공적으로 삭제되었습니다.');
//         const group_id = 'your_group_id'; // 질문! Replace 'your_group_id' with the actual group ID
//         router.push(`/group/${group_id}`);
//     } catch (error) {
//         console.error('게시글 삭제 실패', error);
//     }
// };

// export const handleLike = async (article, setArticle, articleId) => {
//     try {
//         if (article?.likedByUser) {
//             await unlikingArticle(articleId.toString());
//             setArticle(
//                 (prevArticle) =>
//                     prevArticle && {
//                         ...prevArticle,
//                         likes: prevArticle.likes - 1,
//                         likedByUser: false,
//                     },
//             );
//         } else {
//             await likingArticle(articleId.toString());
//             setArticle(
//                 (prevArticle) =>
//                     prevArticle && {
//                         ...prevArticle,
//                         likes: prevArticle.likes + 1,
//                         likedByUser: true,
//                     },
//             );
//         }
//     } catch (error) {
//         console.log('좋아요 토글 실패:', error);
//     }
// };

// export const onSubmitComment = async (
//     data,
//     currentUserId,
//     comments,
//     setComments,
//     reset,
// ) => {
//     try {
//         const result = await postingComment({
//             authorId: currentUserId,
//             content: data.content,
//         });
//         const formattedDate = new Date()
//             .toISOString()
//             .replace(/T/, ' ')
//             .replace(/\..+/, '');
//         setComments((prevComments) => [
//             ...prevComments,
//             {
//                 ...data,
//                 createdAt: formattedDate,
//                 id: result.data.id,
//                 authorId: currentUserId,
//                 authorNickname: '현재 사용자 닉네임',
//                 authorImg: '사용자 이미지 URL',
//             },
//         ]);
//         console.log('성공함');
//     } catch (error) {
//         console.log('실패함');
//         const formattedDate = new Date()
//             .toISOString()
//             .replace(/T/, ' ')
//             .replace(/\..+/, '');
//         setComments((prevComments) => [
//             ...prevComments,
//             {
//                 id: comments.length + 1,
//                 authorId: currentUserId,
//                 authorNickname: '현재 사용자 닉네임',
//                 authorImg: '더미 이미지',
//                 content: data.content,
//                 createdAt: formattedDate,
//             },
//         ]);
//     }
//     reset();
// };

// export const onUpdateComment = async (
//     commentId,
//     data,
//     setComments,
//     setEditingCommentId,
// ) => {
//     try {
//         await updatingComment(commentId.toString(), {
//             content: data.content,
//         });
//         setComments((prevComments) =>
//             prevComments.map((comment) =>
//                 comment.id === commentId ? { ...comment, ...data } : comment,
//             ),
//         );
//         setEditingCommentId(null); // 수정 완료 후 편집 모드 종료
//         console.log('성공함');
//     } catch (error) {
//         console.log('실패함');
//     }
// };

// export const onDeleteComment = async (
//     commentId,
//     setComments,
//     setShowDeleteModal,
// ) => {
//     try {
//         await deletingComment(commentId.toString());
//         setComments((prevComments) =>
//             prevComments.filter((comment) => comment.id !== commentId),
//         );
//         setShowDeleteModal(false); // 삭제 완료 후 모달 닫기
//         console.log('성공함');
//     } catch (error) {
//         console.log('실패함');
//     }
// };

// export const onDeleteArticle = async (articleId) => {
//     try {
//         await deletingArticle(articleId.toString());
//         // 삭제 후 리디렉션 등 추가 작업
//         console.log('게시글 삭제 성공');
//     } catch (error) {
//         console.log('게시글 삭제 실패', error);
//     }
// };

// export const openDeleteModal = (
//     commentId,
//     setCommentToDelete,
//     setShowDeleteModal,
// ) => {
//     setCommentToDelete(commentId);
//     setShowDeleteModal(true);
// };

// export const closeDeleteModal = (setCommentToDelete, setShowDeleteModal) => {
//     setCommentToDelete(null);
//     setShowDeleteModal(false);
// };
