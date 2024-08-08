'use client';

import React, { useEffect } from 'react';
import {
    useForm,
    FieldErrors,
    UseFormRegister,
    UseFormSetFocus,
    SubmitHandler,
} from 'react-hook-form';
import { Box } from '@/components/atoms/Box/Box';
import { Button, Heading } from '@/components/atoms';
import { PageContainer } from '@/components/atoms/PageContainer/PageContainer';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { formWrapperStyles } from '@/components/molecules/Form/Form.styles';
import { handleKeyDownForNextInput } from '@/components/organisms/forms/_utils/handleKeyDownForNextInput';
import formConditions from '@/constants/formConditions';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import { useRouter } from 'next/navigation';
import { handleArticleSubmit } from './_handler';
import { fetchingMemberData } from '../[article_id]/_api/ssr';
import { CreateArticleReq } from './_types';

interface ArticleCreateProps {
    studyGroupId: number;
    handleSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    setFocus: UseFormSetFocus<any>;
    reset: () => void;
}

const CreateArticle: React.FC<ArticleCreateProps> = ({
    studyGroupId,
    setFocus,
    handleSubmit,
    register,
    errors,
    reset,
}) => {
    const router = useRouter();

    useEffect(() => {
        setFocus('title');
    }, [setFocus]);

    return (
        <>
            <Box variant="articleTitleSection">
                <Heading variant="h2" color="white">
                    게시글 작성하기
                </Heading>
                <Heading variant="h4" color="primary" className="p-[10px]">
                    입력하신 정보가 맞는지 다시 확인해주세요.
                </Heading>
            </Box>
            <Box variant="articleContainer">
                <form
                    className={formWrapperStyles({ variant: 'steps' })}
                    onSubmit={handleSubmit}
                >
                    <InputWithLabelAndError
                        id="title"
                        label="제목"
                        placeholder="제목을 입력해주세요."
                        {...register('title', {
                            ...formConditions.plainText,
                        })}
                        error={errors.articleTitle}
                        onKeyDown={(e) =>
                            handleKeyDownForNextInput(
                                e,
                                'content',
                                setFocus,
                            )
                        }
                    />
                    <TextareaWithLabel
                        id="content"
                        label="내용"
                        textareaSize="lg"
                        placeholder="내용을 입력해주세요"
                        {...register('content')}
                        error={errors.content}
                    />
                    <Box variant="articleButtonContainer">
                        <Button
                            color="red"
                            type="button"
                            onClick={() => {
                                reset(); // 폼을 리셋합니다.
                                router.back(); // 이전 페이지로 이동합니다.
                            }}
                        >
                            취소하기
                        </Button>
                        <Button type="submit">등록하기</Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

const NewArticlePage: React.FC = async ({ params: { group_id } }: any) => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
        reset,
    } = useForm<CreateArticleReq>();

    const studyGroupId = group_id;

    const onSubmit: SubmitHandler<CreateArticleReq> = async (
        data: CreateArticleReq,
    ) => {
        console.log('Form data:', data); // 폼 데이터 출력
        try {
            await handleArticleSubmit(data);
            alert('게시글이 성공적으로 작성되었습니다.');
            reset();
        } catch (error) {
            console.error('게시글 작성 실패', error);
        }
    };

    return (
        <PageContainer className="bg-[#36393E]">
            <Box variant="createStudyGroupStepBox">
                <CreateArticle
                    studyGroupId={studyGroupId}
                    setFocus={setFocus}
                    handleSubmit={handleSubmit(onSubmit)}
                    register={register}
                    errors={errors}
                    reset={reset}
                />
            </Box>
        </PageContainer>
    );
};

export default NewArticlePage;
