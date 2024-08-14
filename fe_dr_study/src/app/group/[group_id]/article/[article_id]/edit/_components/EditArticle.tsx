'use client';

import React, { useEffect } from 'react';
import {
    useForm,
    FieldErrors,
    UseFormRegister,
    UseFormSetFocus,
    UseFormHandleSubmit,
} from 'react-hook-form';
import { Box } from '@/components/atoms/Box/Box';
import { Button, Heading } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { formWrapperStyles } from '@/components/molecules/Form/Form.styles';
import { handleKeyDownForNextInput } from '@/components/organisms/forms/_utils/handleKeyDownForNextInput';
import formConditions from '@/constants/formConditions';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import { handleArticleUpdate } from '../../_handler';
import { title } from 'process';
import { EditedArticleData } from '../../_types';

interface EditArticleProps {
    groupId: number;
    articleId: number;
    // onArticleUpdated: (EditedArticle: EditedArticleData) => void;

    initialData: { title: string; content: string };
}

const EditArticle: React.FC<EditArticleProps> = ({
    groupId,
    articleId,
    // onArticleUpdated,
    initialData,
}) => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
        reset,
    } = useForm<{ articleTitle: string; description: string }>({
        defaultValues: {
            articleTitle: initialData.title,
            description: initialData.content,
        },
    });

    const onSubmit = async (data:any) => {
        try {
            const response = await handleArticleUpdate(articleId, data.articleTitle, data.description);
            console.log('response:', response);
            alert('게시글이 성공적으로 수정되었습니다.');
            reset();
            window.location.href = `/group/${groupId}/article/${articleId}`;
            const EditedArticle: EditedArticleData = {
                title: data.articleTitle, content: data.description ,
            };
            console.log('EditedArticle:', EditedArticle);
            // onArticleUpdated(EditedArticle)
        } catch (error) {
            console.error('게시글 수정 실패', error);
        }
    };

    useEffect(() => {
        setFocus('articleTitle');
    }, [setFocus]);

    return (
        <>
            <Box variant="articleTitleSection">
                <Heading variant="h2" color="white">
                    게시글 수정하기
                </Heading>
                <Heading variant="h4" color="primary" className="p-[10px]">
                    입력하신 정보가 맞는지 다시 확인해주세요.
                </Heading>
            </Box>
            <Box variant="articleContainer">
                <form
                    className={formWrapperStyles({ variant: 'steps' })}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <InputWithLabelAndError
                        id="articleTitle"
                        label="제목"
                        placeholder="제목을 입력해주세요."
                        {...register('articleTitle', {
                            ...formConditions.plainText,
                        })}
                        error={errors.articleTitle}
                        onKeyDown={(e) =>
                            handleKeyDownForNextInput(
                                e,
                                'description',
                                (target) =>
                                    setFocus(
                                        target as
                                            | 'articleTitle'
                                            | 'description',
                                    ),
                            )
                        }
                    />
                    <TextareaWithLabel
                        id="description"
                        label="내용"
                        textareaSize="lg"
                        placeholder="내용을 입력해주세요"
                        {...register('description')}
                        error={errors.description}
                    />
                    <Box variant="articleButtonContainer">
                        <Button
                            color="red"
                            type="button"
                            onClick={() => {
                                reset(); // 폼을 리셋합니다.
                                window.location.href = `/group/${groupId}/article/${articleId}`;
                            }}
                        >
                            취소하기
                        </Button>
                        <Button type="submit">수정하기</Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default EditArticle;
