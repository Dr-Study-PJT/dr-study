'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import Step1 from './_components/Step1';
import Step2 from './_components/Step2';
import TitleSection from './_components/TitleSection';
import ResultStep from './_components/Result';
import { usePathname, useRouter } from 'next/navigation';
import { StepProps } from './_types';
import { POST } from '@/app/api/routeModule';
import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';

export interface CreateConferenceFormData {
    studyGroupId: number;
    imageId: number;
    title: string;
    subject: string;
    memberCapacity: number;
    scheduledTime: Date;
}

const initialFormData: CreateConferenceFormData = {
    studyGroupId: 0,
    imageId: 0,
    title: '',
    subject: '',
    memberCapacity: 1,
    scheduledTime: new Date(new Date().getTime() + 60 * 60 * 1000), // 현재 시간에서 1시간 추가
};

interface IStep {
    guide: string;
    component: React.FC<StepProps | any>;
}

const steps: IStep[] = [
    {
        guide: '컨퍼런스를 개설하기 위한 기본 정보를 입력해 주세요.',
        component: Step1,
    },
    {
        guide: '개설한 컨퍼런스 정보가 맞는지 확인하고 제출해주세요.',
        component: Step2,
    },
];

steps.push({
    guide: 'RESULT',
    component: ResultStep,
});

const CreateConferenceProgress = () => {
    const title = '새 컨퍼런스 개설하기';
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] =
        useState<CreateConferenceFormData>(initialFormData);
    const [isResultPage, setIsResultPage] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<{
        success: boolean | null;
        description: string;
    }>({ success: null, description: '' });

    const router = useRouter();
    const pathname = usePathname();

    // 스터디 그룹 id를 form data에 추가합니다.
    useEffect(() => {
        const match = pathname.match(/\/group\/(\d+)/); // 정규 표현식으로 숫자 부분 추출
        const groupId = match ? parseInt(match[1]) : 0;
        setFormData({
            ...initialFormData,
            studyGroupId: groupId,
        });
    }, [pathname]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsResultPage(true);
        setLoading(true);
        try {
            const response = await POST({
                API: API,
                endPoint: '',
                body: formData,
                isAuth: true,
            });

            setTimeout(() => {
                setLoading(false);
                router.push(
                    `/conference/${response.data.data.conferenceId}/info`,
                );
                // setResult({
                //     success: true,
                //     description: response.data.message,
                // });
            }, 2000);
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                '컨퍼런스 생성 중 오류가 발생했습니다. 다시 시도해주세요.';
            setTimeout(() => {
                setLoading(false);
                setResult({
                    success: false,
                    description: errorMessage,
                });
            }, 2000);
        }
        handleNext();
    };

    const handleRetry = () => {
        setCurrentStep(0);
        setIsResultPage(false);
        setLoading(false);
        setResult({ success: null, description: '' });
    };

    const StepComponent = steps[currentStep].component;
    return (
        <div className="flex justify-center w-full min-h-full bg-gray-800">
            <div className="w-full h-max flex bg-gray-900 text-dr-white rounded-lg shadow-xl overflow-hidden border-[1px] border-dr-gray-300 p-4 ">
                <div className="h-max min-h-[60vh] w-full flex flex-col justify-start items-center gap-4">
                    {!isResultPage && (
                        <TitleSection
                            title={title}
                            guide={steps[currentStep].guide}
                            totalStep={steps.length}
                            currentStep={currentStep}
                        />
                    )}
                    <section className="CONTENTS-SECTION-STEP1 animate-fadeIn w-max min-w-[75%] h-max min-h-[50%] flex flex-col gap-2 transition-all duration-200">
                        <StepComponent
                            onNext={handleNext}
                            onBack={handleBack}
                            onSubmit={handleSubmit}
                            data={formData}
                            setData={setFormData}
                        />
                    </section>
                    {isResultPage && (
                        <ResultStep
                            loading={loading}
                            successMessage="컨퍼런스 생성이 완료되었습니다!"
                            failMessage="컨퍼런스 생성에 실패했습니다."
                            onHomeClick={() => router.push('/')}
                            onSuccessConfirmClick={() =>
                                router.push('/auth/login')
                            }
                            onFailureEditClick={handleRetry}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateConferenceProgress;
