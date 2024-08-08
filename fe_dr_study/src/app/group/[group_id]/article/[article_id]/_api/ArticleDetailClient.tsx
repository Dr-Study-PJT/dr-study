'use client';

import React, { useEffect } from 'react';
import { useForm, FieldErrors, UseFormRegister, UseFormSetFocus } from 'react-hook-form';
import { Box } from '@/components/atoms/Box/Box';
import { Button, Heading, Span } from '@/components/atoms';
import { PageContainer } from '@/components/atoms/PageContainer/PageContainer';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { useHandlers } from '../_handler';
import { ArticleData } from '../_types';

const formatDate = (dateString: string | number | Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(dateString));
};

interface CommentFormProps {
    articleId: number;
    handleSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    setFocus: UseFormSetFocus<any>;
    reset: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
    articleId,
    setFocus,
    handleSubmit,
    register,
    errors,
    reset,
}) => {
    useEffect(() => {
        setFocus('comment_content');
    }, [setFocus]);

    return (
        <Box variant="commentCreateContainer">
            <img
                src="/path/to/your/image.jpg"
                alt="author"
                className="flex flex-row rounded-full w-auto h-full mr-2 object-cover"
            />
            <form onSubmit={handleSubmit} className="w-full flex items-center">
                <div className="flex flex-col w-full">
                    <InputWithLabelAndError
                        label={''}
                        id="comment_content"
                        placeholder="댓글을 입력해주세요."
                        {...register('comment_content', {
                            required: '댓글 내용을 입력해주세요.',
                        })}
                        error={errors.comment_content?.message}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                        <Button color="red" type="button" onClick={() => reset()}>
                            취소
                        </Button>
                        <Button type="submit">댓글 작성</Button>
                    </div>
                </div>
            </form>
        </Box>
    );
};

interface ArticleDetailClientProps {
    article: ArticleData;
}

const ArticleDetailClient: React.FC<ArticleDetailClientProps> = ({ article }) => {
    const { register, handleSubmit, setFocus, formState: { errors }, reset } = useForm();
    const { handleCommentSubmit, handleCommentUpdate, handleCommentDelete, handleArticleDelete } = useHandlers();

    const onSubmit = async (data: any) => {
        try {
            await handleCommentSubmit(data, article.id);
            alert('댓글이 성공적으로 작성되었습니다.');
            reset();
        } catch (error) {
            console.error('댓글 작성 실패', error);
        }
    };

    return (
        <PageContainer className="bg-[#36393E]">
            <Box variant="articleDetail">
                <Heading variant="h2" color="white" className="flex flex-row justify-center items-center">
                    {article.title ? article.title : '제목 없음'}
                </Heading>
                <Box variant="articleCreateAtAndViews" className="flex flex-row justify-between">
                    <p className="text-gray-400 text-sm">{formatDate(article.createdAt)}</p>
                    <p className="text-gray-400 text-sm">조회수: {article.viewCount}</p>
                </Box>
                <div className="w-1/2 border-t border-[#5E658B]"></div>
                <Box variant="articleContentsSection">
                    <Span variant="b3" color="white">{article.content}</Span>
                </Box>
                <CommentForm
                    articleId={article.id}
                    setFocus={setFocus}
                    handleSubmit={handleSubmit(onSubmit)}
                    register={register}
                    errors={errors}
                    reset={reset}
                />
                <Box variant="articleCommentsListContainer">
                    <Box variant="commentPDP">
                        {article.comments.map((comment: { memberInfo: { imageUrl: any; nickname: any; }; createdAt: string | number | Date; content: any; id: any; }, index: React.Key | null | undefined) => (
                            <Box key={index} className="flex flex-row">
                                <div className="w-full flex flex-col">
                                    <Box variant="commentPDPHeader">
                                        <Box variant="commentProfileLeft">
                                            <img
                                                src={comment.memberInfo.imageUrl ?? ''}
                                                alt="author"
                                                className="flex flex-row justify-center rounded-full w-[60px] h-[60px] mr-2 object-cover"
                                            />
                                            <Box variant="commentProfileWithNickAndTime">
                                                <Span color="white">{String(comment.memberInfo.nickname)}</Span>
                                                <Span color="white">{formatDate(comment.createdAt)}</Span>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box variant="commentText" className="w-full">
                                        <Span color="white">{String(comment.content)}</Span>
                                    </Box>
                                    <div className="flex justify-end space-x-2 mt-2">
                                        <Button color="red" onClick={() => handleCommentDelete(comment.id)}>삭제</Button>
                                        <Button type="button" onClick={() => handleCommentUpdate(comment.id, String(comment.content))}>수정</Button>
                                    </div>
                                </div>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <div className="flex justify-end space-x-2 mt-2">
                    <Button color="red" onClick={() => handleArticleDelete(article.id)}>게시글 삭제</Button>
                </div>
            </Box>
        </PageContainer>
    );
};

export default ArticleDetailClient;
