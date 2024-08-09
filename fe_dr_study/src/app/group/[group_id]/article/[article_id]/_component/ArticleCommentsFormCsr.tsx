// ArticleCommentsForm.tsx
'use client';

import React, { useEffect } from 'react';
import {
    useForm,
    FieldErrors,
    UseFormRegister,
    UseFormSetFocus,
} from 'react-hook-form';
import { Box } from '@/components/atoms/Box/Box';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { useHandlers } from '../_handler';

interface CommentFormProps {
    articleId: number | string;
    setFocus: UseFormSetFocus<any>;
    handleSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
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
}

const ArticleCommentsForm: React.FC<ArticleCommentsFormProps> = ({
    articleId,
}) => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
        reset,
    } = useForm();
    const { handleCommentSubmit } = useHandlers();

    const onSubmit = async (data: any) => {
        try {
            await handleCommentSubmit(data, articleId);
            alert('댓글이 성공적으로 작성되었습니다.');
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
        />
    );
};

export default ArticleCommentsForm;
