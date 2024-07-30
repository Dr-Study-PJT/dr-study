'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/atoms';
import { Box } from '@/components/atoms/Box/Box';
import { StepsBox } from '@/components/molecules/StepsBox/StepsBox';

import { MemberBaseInfoStep, RegisterConfirmStep } from './_component/steps';
import { RegisterProgressProps } from './RegisterProgress.types';
import { register as registerMember } from '@/app/auth/register/_api/register';
import { IRegisterReq } from '@/interfaces/members';

const RegisterProgress = ({ steps = 2 }: RegisterProgressProps) => {
    const [bodyData, setBodyData] = useState<IRegisterReq>({
        file: null,
        email: '',
        nickname: '',
        password: '',
    });
    const [imageDisplay, setImageDisplay] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(1);

    const {
        register, // field 등록
        handleSubmit, // form 에서 submit 수행 될 때 실행할 함수를 인자로 전달
        setFocus,
        formState: { errors }, // error 메시지를 다루기 위한 것
    } = useForm<any>();

    const handleNextStep = (data: any) => {
        const { rePassword, ...restData } = data;
        setBodyData({ ...bodyData, ...restData });
        if (currentStep < steps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleRegister = async (data: any) => {
        try {
            const response = await registerMember(bodyData);
            console.log('Registration successful:', response);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const progressData = {
        title: 'Dr. Study에 가입하기',
        childrenData: [
            {
                subTitle: '닥터 스터디의 가족이 되어보세요.',
                component: (
                    <MemberBaseInfoStep
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
                subTitle: '입력한 회원 정보가 맞는지 확인해주세요.',
                component: (
                    <RegisterConfirmStep
                        setFocus={setFocus}
                        key={2}
                        handleSubmit={handleSubmit(handleRegister)}
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
                <div className="w-full">
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
                    <Button onClick={handleSubmit(handleRegister)}>완료</Button>
                )}
            </div>
        </Box>
    );
};

export default RegisterProgress;