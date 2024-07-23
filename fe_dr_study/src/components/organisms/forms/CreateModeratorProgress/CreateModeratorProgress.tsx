'use client';

import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { CreateStudyGroupProgressProps } from '../CreateStudyGroupProgress/CreateStudyGroupProgress.types';
import { CustomModeratorStep } from './_component/steps/CustomModeratorStep';
import { WritePrePromptStep } from './_component/steps/WritePrePromptStep';
import { CreateSystemStep } from './_component/steps/CreateSystemStep';
import { ConfirmCreateModeratorStep } from './_component/steps/ConfirmCreateModeratorStep';
import { Box } from '@/components/atoms/Box/Box';
import { StepsBox } from '@/components/molecules/StepsBox/StepsBox';
import { Button } from '@/components/atoms';

const CreateModeratorProgress = ({
    // 하위 컴포넌트에 이벤트를 전달하려면,
    // 이 형식 그대로 가져다가 `progressData` 데이터를 작성해서
    // 컴포넌트 내에서 직접 전달 해야함.
    // (그렇지 않으면 진짜 쓸 수 있는 라이브러리처럼 구현해야 하는데
    // react-hook-form 이랑 연결시켜 구현할 자신이 없음 (너무 어려움))
    steps = 4,
}: CreateStudyGroupProgressProps) => {
    const [bodyData, setBodyData] = useState({
        file: '/moderator.png',
        moderator_name: '사회자 이름',
        appearance: '타입 A',
        voice: '타입 A',
        tone: '타입 A',
        block_prompt: '블록 프롬프트',
        pre_prompt: '사전 프롬프트',
    });
    const [imageDisplay, setImageDisplay] = useState<string | null>(
        '/moderator.png',
    );
    const [currentStep, setCurrentStep] = useState<number>(1);

    // any 타입 작성 !필요!
    const {
        register, // field 등록
        handleSubmit, // form 에서 submit 수행 될 때 실행할 함수를 인자로 전달
        setFocus,
        formState: { errors }, // error 메시지를 다루기 위한 것
    } = useForm<any>();

    // any 타입 작성 !필요!
    const handleNextStep = (data: any) => {
        setBodyData({ ...bodyData, ...data });
        if (currentStep < steps) {
            setCurrentStep(currentStep + 1);
        }
    };

    // any 타입 작성 !필요!
    const requestData = (data: any) => {
        console.log('bodyData:', {
            ...bodyData,
        });
    };

    const progressData = {
        title: '사회자 AI 생성',
        childrenData: [
            {
                subTitle: 'AI 사회자를 커스터마이즈 할 수 있습니다.',
                component: (
                    <CustomModeratorStep
                        setFocus={setFocus}
                        key={1}
                        bodyData={bodyData}
                        setBodyData={setBodyData}
                        imageDisplay={imageDisplay}
                        setImageDisplay={setImageDisplay}
                        handleSubmit={handleSubmit(handleNextStep)}
                        register={register}
                        errors={errors}
                    />
                ),
            },
            {
                subTitle:
                    'AI 사회자에게 사전 프롬프트를 전달하여 보다 우수한 역할을 수행할 수 있도록 합니다.',
                component: (
                    <WritePrePromptStep
                        setFocus={setFocus}
                        key={2}
                        handleSubmit={handleSubmit(handleNextStep)}
                        register={register}
                        errors={errors}
                    />
                ),
            },
            {
                subTitle:
                    '블록 쌓기로 더욱 자세한 스터디 진행방식을 만들어보세요.',
                component: (
                    <CreateSystemStep
                        setFocus={setFocus}
                        key={3}
                        handleSubmit={handleSubmit(handleNextStep)}
                        register={register}
                        errors={errors}
                        bodyData={bodyData}
                        setBodyData={setBodyData}
                        imageDisplay={imageDisplay}
                        setImageDisplay={setImageDisplay}
                    />
                ),
            },
            {
                subTitle: '작성하신 내용이 맞는지 확인하고 제출해주세요.',
                component: (
                    <ConfirmCreateModeratorStep
                        setFocus={setFocus}
                        key={4}
                        handleSubmit={handleSubmit(handleNextStep)}
                        register={register}
                        errors={errors}
                        bodyData={bodyData}
                        setBodyData={setBodyData}
                        imageDisplay={imageDisplay}
                        setImageDisplay={setImageDisplay}
                    />
                ),
            },
        ],
    };

    return (
        <Box variant="createStudyGroupStepBox">
            <StepsBox
                title={progressData.title}
                subTitle={progressData.childrenData[currentStep - 1].subTitle}
                steps={steps}
                currentStep={currentStep}
            >
                <div className="w-full w-">
                    {progressData.childrenData[currentStep - 1].component}
                </div>
            </StepsBox>
            <div className="w-full flex justify-end">
                {currentStep > 1 && (
                    <Button onClick={() => setCurrentStep(currentStep - 1)}>
                        이전
                    </Button>
                )}
                {currentStep < steps && (
                    <Button onClick={handleSubmit(handleNextStep)}>다음</Button>
                )}
                {currentStep === steps && (
                    <Button onClick={handleSubmit(requestData)}>완료</Button>
                )}
            </div>
        </Box>
    );
};

export default CreateModeratorProgress;
