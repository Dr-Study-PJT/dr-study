// fe_dr_study/src/app/moderator/new/page.tsx
'use client';
import React, { FormEvent, useState } from 'react';
import Step1 from './_components/Step1';
import Step2 from './_components/Step2';
import Step3 from './_components/Step3';
import Step4 from './_components/Step4';
import ResultStep from './_components/Result';
import { ICreateModeratorReq } from '../_types';
import { createModerator } from '../_api/csr';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toastUtil';

const pageStyles = `PAGE-CREATE-MODERATOR flex justify-center items-center w-full min-h-full h-max bg-dr-indigo-200 py-12`;
const containerStyles = `CONTAINER-FORM min-w-[60%] w-max h-max flex bg-dr-indigo-300 text-dr-white rounded-lg shadow-dr-rb-2 overflow-hidden border-[1px] border-dr-indigo-100 p-4`;

const steps = [
    { guide: '마음에 드는 사회자의 모습을 선택해보세요.', component: Step1 },
    {
        guide: 'AI에게 사회자의 역할, 노하우, 스터디 진행 단계를 설명하세요.',
        component: Step2,
    },
    {
        guide: '블록 쌓기로 더욱 자세한 스터디 진행방식을 만들어보세요.',
        component: Step3,
    },
    {
        guide: '작성하신 내용이 맞는지 확인하고 제출해주세요.',
        component: Step4,
    },
];

const initialFormData: ICreateModeratorReq = {
    name: '',
    voiceType: 'A',
    modelType: 'A',
    characterType: 'A',
    prePrompt: '',
    description: '',
    script: '',
};

const CreateModeratorPage: React.FC = () => {
    const router = useRouter();

    const guide = 'AI 사회자 생성';
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] =
        useState<ICreateModeratorReq>(initialFormData);
    const [isResultPage, setIsResultPage] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<{
        id: number | null;
        success: boolean | null;
        description: string;
    }>({ id: null, success: null, description: '' });

    const handleNext = () => {
        if (currentStep === 2 && formData.script === '') {
            console.log('currentStep:', currentStep);
            showToast('error', '블록을 하나 이상 놓아주세요.');
            return;
        }

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
        if (currentStep === 2 && formData.script === '') {
            console.log('currentStep:', currentStep);
            showToast('error', '블록을 하나 이상 놓아주세요.');
            return;
        }
        setIsResultPage(true);
        setLoading(true);

        try {
            const response = await createModerator(formData);
            setTimeout(() => {
                setLoading(false);
                setResult({
                    id: response?.data?.moderatorId,
                    success: true,
                    description: 'AI 사회자 생성이 완료되었습니다!',
                });
            }, 2000);
        } catch (error: any) {
            setTimeout(() => {
                setLoading(false);
                setResult({
                    id: null,
                    success: false,
                    description:
                        'AI 사회자 생성 중 오류가 발생했습니다. 다시 시도해주세요.',
                });
            }, 2000);
        }
        handleNext();
    };

    const handleRetry = () => {
        setCurrentStep(0);
        setIsResultPage(false);
        setLoading(false);
        setResult({ id: null, success: null, description: '' });
    };

    const StepComponent = steps[currentStep].component;

    return (
        <div className={pageStyles}>
            <div className={containerStyles}>
                <div className="h-max min-h-[70vh] w-full flex flex-col justify-start items-center gap-4 ">
                    {!isResultPage && (
                        <section className="TITLE-SECTION w-1/2 h-1/4 flex flex-col justify-center">
                            <div className="TITLE-AND-PAHSE items-center flex flex-col justify-center w-full h-max">
                                <div className="TITLE-TEXT text-dr-header-2 font-bold w-full text-center">
                                    {guide}
                                </div>
                                <div className="SUBTITLE-TEXT text-dr-body-4 font-semibold text-dr-coral-100 w-full text-center">
                                    {steps[currentStep].guide}
                                </div>
                                <div className="BAR-PHASE mt-8 w-4/6 h-max pb-6">
                                    <div className="relative w-full h-max">
                                        <div className="absolute top-[0.375rem] left-0 w-full border-[1px] border-dr-indigo-100 z-0"></div>
                                        <div className="absolute top-0 left-0 w-full flex flex-row justify-around z-10">
                                            {steps.map((_, i) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`w-3 h-3 bg-dr-coral-300 rounded-full shadow-md border-[1px] transition-colors duration-300 ${
                                                            i === currentStep
                                                                ? 'border-dr-white'
                                                                : 'border-dr-coral-300'
                                                        }`}
                                                    ></div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                    {!isResultPage && (
                        <section className="CONTENTS-SECTION-STEP1-AVATAR animate-fadeIn w-max min-w-[75%] h-max min-h-[50%] flex flex-col gap-2 transition-all duration-200">
                            <StepComponent
                                onNext={handleNext}
                                onBack={handleBack}
                                onSubmit={handleSubmit}
                                data={formData}
                                setData={setFormData}
                            />
                        </section>
                    )}
                    {isResultPage && (
                        <ResultStep
                            loading={loading}
                            result={result}
                            successMessage="AI 사회자 생성이 완료되었습니다!"
                            failMessage="AI 사회자 생성에 실패했습니다."
                            onHomeClick={() => router.push('/')}
                            onFailureEditClick={handleRetry}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateModeratorPage;
