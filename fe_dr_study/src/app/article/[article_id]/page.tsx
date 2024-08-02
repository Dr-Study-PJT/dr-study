'use client';

// React와 React Hook을 임포트합니다.
import React, { useEffect, useState } from 'react';
import { useForm, FieldErrors, UseFormRegister } from 'react-hook-form';

// 프로젝트의 컴포넌트들을 임포트합니다.
import { Box, Button, Heading, Span } from '@/components/atoms';
import { PageContainer } from '@/components/atoms/PageContainer/PageContainer';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { Textarea } from '@/components/atoms/Textarea';
// !바뀜! GET, POST, PUT, DELETE 함수를 임포트합니다.
import { GET, POST, PUT, DELETE } from '../../api/routeModule';
import { articleAPI as API } from '@/api/axiosInstanceManager';

// 또는 다음과 같이 경로를 수정할 수 있습니다.

// Article 인터페이스를 정의합니다.
interface Article {
    articleId: number;
    articleTitle: string;
    description: string;
}

// Comment 인터페이스를 정의합니다.
interface Comment {
    comment_author: string;
    comment_author_Img: string;
    commentId: number;
    comment_content: string;
    created_at: string;
}

// ArticleDetailPage 컴포넌트를 정의합니다.
const ArticleDetailPage: React.FC = () => {
    // article 객체를 정의합니다.
    const article: Article = {
        articleId: 1,
        articleTitle: '게시글 제목',
        description: '게시글 내용',
    };

    // useForm 훅을 사용하여 폼을 관리합니다.
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // comments 상태를 관리합니다.
    const [comments, setComments] = useState<Comment[]>([]);

    // 컴포넌트가 마운트될 때 게시글 상세 정보를 가져옵니다.
    useEffect(() => {
        const fetchArticleDetails = async () => {
            try {
                // !바뀜! GET 함수를 사용하여 게시글의 모든 댓글을 가져옵니다.
                const result = await GET(
                    `groups/${group_id}/articles/${article.articleId}/comments`,
                );
                console.log(result.message);
                setComments(result.data.comments);
            } catch (error) {
                console.log('서버 작동안되서 더미데이터 사용중');
                setComments([
                    {
                        comment_author: '더미 사용자',
                        comment_author_Img: '더미 이미지',
                        commentId: 1,
                        comment_content: '더미 댓글 내용',
                        created_at: '2024.07.14 12:00', // 형식 맞춤
                    },
                ]);
            }
        };

        fetchArticleDetails();
    }, [article.articleId]);

    // 댓글 작성 폼 제출 시 호출되는 함수입니다.
    const onSubmitComment = async (data: any) => {
        try {
            // !바뀜! POST 함수를 사용하여 댓글을 작성합니다.
            const result = await POST({
                API, // !바뀜! API 인스턴스를 사용합니다.
                endPoint: `groups/${group_id}/articles/${article.articleId}/comments`,
                isAuth: true, // 인증이 필요합니다.
                body: data, // 요청 본문 데이터입니다.
            });
            console.log(result.message);
            // 현재 시간을 형식에 맞게 변환합니다.
            const formattedDate = new Intl.DateTimeFormat('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }).format(new Date());
            // 새 댓글을 추가합니다.
            setComments((prevComments) => [
                ...prevComments,
                { ...data, created_at: formattedDate },
            ]);
        } catch (error) {
            console.log('서버 작동안되서 더미데이터 사용중');
            const formattedDate = new Intl.DateTimeFormat('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }).format(new Date());
            // 서버 작동하지 않을 때 더미 데이터를 추가합니다.
            setComments((prevComments) => [
                ...prevComments,
                {
                    comment_author: '더미 사용자',
                    comment_author_Img: '더미 이미지',
                    commentId: comments.length + 1,
                    comment_content: data.comment_content,
                    created_at: formattedDate,
                },
            ]);
        }
        // 폼을 초기화합니다.
        reset();
    };

    // 댓글 수정 시 호출되는 함수입니다.
    const onUpdateComment = async (commentId: number, data: any) => {
        try {
            // !바뀜! PUT 함수를 사용하여 댓글을 수정합니다.
            const result = await PUT({
                API, // !바뀜! API 인스턴스를 사용합니다.
                endPoint: `groups/${group_id}/articles/${article.articleId}/comments/${commentId}`,
                isAuth: true, // 인증이 필요합니다.
                body: data, // 요청 본문 데이터입니다.
            });
            console.log(result.message);
            // 수정된 댓글을 업데이트합니다.
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.commentId === commentId
                        ? { ...comment, ...data }
                        : comment,
                ),
            );
        } catch (error) {
            console.log('댓글 수정 실패');
        }
    };

    // 댓글 삭제 시 호출되는 함수입니다.
    const onDeleteComment = async (commentId: number) => {
        try {
            // !바뀜! DELETE 함수를 사용하여 댓글을 삭제합니다.
            const result = await DELETE({
                API, // !바뀜! API 인스턴스를 사용합니다.
                endPoint: `groups/${group_id}/articles/${article.articleId}/comments/${commentId}`,
                isAuth: true, // 인증이 필요합니다.
            });
            console.log(result.message);
            // 삭제된 댓글을 상태에서 제거합니다.
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.commentId !== commentId),
            );
        } catch (error) {
            console.log('댓글 삭제 실패');
        }
    };

    return (
        <PageContainer className="bg-[#36393E]">
            <Box variant="articleDetail" className="h-4/5 overflow-y-auto">
                <Heading variant="h2" color="white">
                    {article.articleTitle}
                </Heading>
                {/* 여기에 동적으로 생성날짜랑 조회수 넣어야함. */}
                <Box variant="articleCreateAtAndViews">
                    <Heading variant="h4" color="primary">
                        게시글 작성 날짜
                    </Heading>
                    <Heading variant="h4" color="primary">
                        /조회수
                    </Heading>
                </Box>

                {/* 여기에 구분선 있음! */}
                <div className="w-1/2 border-t border-[#5E658B]"></div>

                {/* 얘는 작업 후에 속성 바꾸자 ㅇㅇ */}
                <Box variant="articleContentsSection">
                    <Span variant="b3" color="white">
                        {article.description}{' '}
                    </Span>
                </Box>

                <Box variant="commentCreateContainer">
                    <img
                        src="/path/to/your/image.jpg"
                        alt="author"
                        className="flex flex-row rounded-full w-auto h-full mr-2 object-cover"
                    />
                    <form
                        onSubmit={handleSubmit(onSubmitComment)}
                        className="w-full flex items-center"
                    >
                        <div className="flex flex-col w-full">
                            <InputWithLabelAndError
                                id="comment_content"
                                // label="댓글"
                                placeholder="댓글을 입력해주세요."
                                {...register('comment_content', {
                                    required: '댓글 내용을 입력해주세요.',
                                })}
                                error={errors.comment_content}
                            />
                            <div className="flex justify-end space-x-2 mt-2">
                                <Button color="red">취소</Button>
                                <Button type="submit">댓글 작성</Button>
                            </div>
                        </div>
                    </form>
                </Box>

                {/* 여기에 댓글 리스트 만들거임. */}
                <Box variant="articleCommentsListContainer">
                    <Box variant="commentPDP">
                        {comments.map((comment, index) => (
                            <Box key={index} className="flex flex-row ">
                                <div className="w-full flex flex-col ">
                                    <Box variant="commentPDPHeader">
                                        <Box variant="commentProfileLeft">
                                            <img
                                                src={comment.comment_author_Img}
                                                alt="author"
                                            />
                                            <Box variant="commentProfileWithNickAndTime">
                                                <p>{comment.comment_author}</p>
                                                <p>{comment.created_at}</p>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box
                                        variant="commentText"
                                        className="w-full"
                                    >
                                        <p>{comment.comment_content}</p>
                                    </Box>

                                    <Box variant="commentActions">
                                        <Button onClick={() => onUpdateComment(comment.commentId, { comment_content: '수정된 댓글 내용' })}>
                                            수정
                                        </Button>
                                        <Button onClick={() => onDeleteComment(comment.commentId)}>
                                            삭제
                                        </Button>
                                    </Box>
                                </div>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </PageContainer>
    );
};

export default ArticleDetailPage;
