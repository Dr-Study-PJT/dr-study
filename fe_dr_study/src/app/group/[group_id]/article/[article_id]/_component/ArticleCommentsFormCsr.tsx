'use client';

import React from 'react';
import {
    useForm,
    FieldErrors,
    UseFormRegister,
    UseFormSetFocus,
} from 'react-hook-form';
import { Box } from '@/components/atoms/Box/Box';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { handleCommentSubmit } from '../_handler';
import { CommentData } from '../_types';

interface CommentFormProps {
    articleId: string;
    setFocus: UseFormSetFocus<any>;
    handleSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    reset: () => void;
    initialContent: string;
    imageUrl: string; // 추가
}

const CommentForm: React.FC<CommentFormProps> = ({
    articleId,
    setFocus,
    handleSubmit,
    register,
    errors,
    reset,
    initialContent,
    imageUrl,
}) => {
    React.useEffect(() => {
        setFocus('comment_content');
    }, [setFocus]);

    return (
        <Box variant="commentCreateContainer" className="flex items-center">
            <img
                src={imageUrl}
                alt="author"
                className="flex flex-row justify-center rounded-full w-[60px] h-[60px] mr-4 object-cover"
            />
            <form onSubmit={handleSubmit} className="w-full flex items-center">
                <div className="flex flex-col w-full">
                    <InputWithLabelAndError
                        label={''}
                        id="comment_content"
                        placeholder="댓글을 입력해주세요."
                        defaultValue={initialContent}
                        {...register('comment_content', {
                            required: '댓글 내용을 입력해주세요.',
                        })}
                        error={errors.comment_content?.message}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                        <Button
                            color="red"
                            type="button"
                            onClick={() => reset()}
                        >
                            취소
                        </Button>
                        <Button type="submit">댓글 작성</Button>
                    </div>
                </div>
            </form>
        </Box>
    );
};

interface ArticleCommentsFormProps {
    articleId: string;
    onCommentSubmitted: (comment: CommentData) => void;
    initialContent: string;
    imageUrl: string; // 추가
}

const ArticleCommentsForm: React.FC<ArticleCommentsFormProps> = ({
    articleId,
    onCommentSubmitted,
    initialContent,
    imageUrl,
}) => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const newComment = await handleCommentSubmit(
                data,
                articleId?.toString(),
            );
            onCommentSubmitted(newComment);
            reset();
        } catch (error) {
            console.error('댓글 작성 실패', error);
        }
    };

    return (
        <CommentForm
            articleId={articleId}
            setFocus={setFocus}
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            reset={reset}
            initialContent={initialContent}
            imageUrl={imageUrl} // 추가
        />
    );
};

export default ArticleCommentsForm;
