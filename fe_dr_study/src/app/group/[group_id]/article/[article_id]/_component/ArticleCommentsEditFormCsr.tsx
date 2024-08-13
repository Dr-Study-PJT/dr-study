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
import { handleCommentUpdate } from '../_handler';
import { CommentData } from '../_types';

interface CommentEditFormProps {
    commentId: number;
    setFocus: UseFormSetFocus<any>;
    handleSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    reset: () => void;
    initialContent: string;
    onCancel: () => void; // 추가
}

const CommentEditForm: React.FC<CommentEditFormProps> = ({
    commentId,
    setFocus,
    handleSubmit,
    register,
    errors,
    reset,
    initialContent,
    onCancel, // 추가
}) => {
    React.useEffect(() => {
        setFocus('comment_content');
    }, [setFocus]);

    return (
        <Box variant="commentCreateContainer">
            <form onSubmit={handleSubmit} className="w-full flex items-center">
                <div className="flex flex-col w-full">
                    f{' '}
                    <InputWithLabelAndError
                        label={''}
                        id="comment_content"
                        placeholder="댓글을 수정해주세요."
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
                            onClick={() => {
                                reset();
                                onCancel(); // 추가
                            }}
                        >
                            취소
                        </Button>
                        <Button type="submit">댓글 수정</Button>
                    </div>
                </div>
            </form>
        </Box>
    );
};

interface ArticleCommentsEditFormProps {
    commentId: number;
    onCommentUpdated: (comment: CommentData) => void;
    initialContent: string;
    onCancel: () => void; // 추가
}

const ArticleCommentsEditForm: React.FC<ArticleCommentsEditFormProps> = ({
    commentId,
    onCommentUpdated,
    initialContent,
    onCancel, // 추가
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
            await handleCommentUpdate(commentId, data.comment_content);
            const updatedComment = {
                id: commentId,
                content: data.comment_content,
            } as CommentData;
            onCommentUpdated(updatedComment);
            reset();
        } catch (error) {
            console.error('댓글 수정 실패', error);
        }
    };

    return (
        <CommentEditForm
            commentId={commentId}
            setFocus={setFocus}
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            reset={reset}
            initialContent={initialContent}
            onCancel={onCancel} // 추가
        />
    );
};

export default ArticleCommentsEditForm;
