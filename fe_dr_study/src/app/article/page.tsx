'use client';
// 게시판 조회
import React, { useEffect } from 'react';
import {
    useForm,
    FieldErrors,
    UseFormRegister,
    UseFormSetFocus,
} from 'react-hook-form';
import { Box, Button, Heading } from '@/components/atoms';
import { PageContainer } from '@/components/atoms/PageContainer/PageContainer';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { formWrapperStyles } from '@/components/molecules/Form/Form.styles';
import { handleKeyDownForNextInput } from '@/components/organisms/forms/_utils/handleKeyDownForNextInput';
import formConditions from '@/constants/formConditions';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import { articleAPI as API } from '../api/axiosInstanceManager';

interface DashboardArticleCreateProps {
    handleSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    setFocus: UseFormSetFocus<any>;
    reset: () => void;
}

const CreateArticle: React.FC<DashboardArticleCreateProps> = ({
    setFocus,
    handleSubmit,
    register,
    errors,
    reset,
}) => {
    useEffect(() => {
        setFocus('articleTitle');
    }, [setFocus]);

    return (
        <>
            <Box variant="dashboardTitleSection">
                <Heading variant="h2" color="white">
                    게시글 작성하기
                </Heading>
                <Heading variant="h4" color="primary" className="p-[10px]">
                    입력하신 정보가 맞는지 다시 확인해주세요.
                </Heading>
            </Box>
            <Box variant="dashboardContentsSection">
                <form
                    className={formWrapperStyles({ variant: 'steps' })}
                    onSubmit={handleSubmit}
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
                                setFocus,
                            )
                        }
                    />
                    <TextareaWithLabel
                        id="description"
                        label="내용"
                        textareaSize="lg"
                        name="description"
                        placeholder="내용을 입력해주세요"
                        {...register('description')}
                        error={errors.description}
                    />


                    <Box variant="articleButtonContainer">
                        <Button
                            color="red"
                            type="button"
                            onClick={() => {
                                reset();
                            }}
                        >
                            리셋
                        </Button>
                        <Button type="submit">등록하기</Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

const NewArticlePage: React.FC = () => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const response = await fetch(`https://api.dr-study.kro.kr/v1/articles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    group_id: 1,
                    articleTitle: data.articleTitle,
                    description: data.description,
                }),
            });

            const result = await response.json();
            console.log(result.message);
            // 필요한 경우 추가적인 작업 수행
        } catch (error) {
            console.log('서버 작동안되서 더미데이터 사용중');
        }
    };

    return (
        <PageContainer className="bg-[#36393E]">
            <Box variant="createStudyGroupStepBox">
                <CreateArticle
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
