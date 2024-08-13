'use client';

import React, { useEffect } from 'react';
import {
    useForm,
    FieldErrors,
    UseFormRegister,
    UseFormSetFocus,
} from 'react-hook-form';
import { Box } from '@/components/atoms/Box/Box';
import { Button, Heading } from '@/components/atoms';
import { PageContainer } from '@/components/atoms/PageContainer/PageContainer';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { formWrapperStyles } from '@/components/molecules/Form/Form.styles';
import { handleKeyDownForNextInput } from '@/components/organisms/forms/_utils/handleKeyDownForNextInput';
import formConditions from '@/constants/formConditions';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import { handleArticleUpdate } from '../article/[article_id]/_handler';
import { fetchingArticle } from '../article/[article_id]/_api/ssr'
import Link from 'next/link';

interface ArticleEditProps {
    groupId: number;
    articleId: number;
    title: string;
    content: string;
}

const EditArticle: React.FC<ArticleEditProps> = ({
    groupId,
    articleId,
    title,
    content,
}) => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            articleTitle: title,
            description: content,
        },
    });

    useEffect(() => {
        setFocus('articleTitle');
    }, [setFocus]);

    const onSubmit = async (data: any) => {
        try {
            await handleArticleUpdate(articleId, title, content);
            alert('게시글이 성공적으로 수정되었습니다.');
            reset();
            window.location.href = `/group/${groupId}/article/${articleId}`;
        } catch (error) {
            console.error('게시글 수정 실패', error);
        }
    };

    return (
        <PageContainer className="bg-[#36393E]">
            <Box variant="createStudyGroupStepBox">
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
                                    setFocus as (target: string) => any,
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
                            <Link
                                href={`/group/${groupId}/article/${articleId}`}
                                passHref
                            >
                                <Button
                                    color="red"
                                    type="button"
                                    onClick={() => reset()}
                                >
                                    취소하기
                                </Button>
                            </Link>
                            <Button type="submit">수정하기</Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </PageContainer>
    );
};

const EditArticlePage = async ({ params }: { params: { group_id: number, article_id: number } }) => {
    const { group_id, article_id } = params;
    const articleData = await fetchingArticle(article_id);
    return (
        <EditArticle
            groupId={group_id}
            articleId={article_id}
            title={articleData.title}
            content={articleData.content}
        />
    );
};

export default EditArticlePage;
