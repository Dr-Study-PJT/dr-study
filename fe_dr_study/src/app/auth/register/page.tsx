'use client';
import { IRegisterReq } from '@/interfaces/members';
import React, { FormEvent, useState } from 'react';
import Step1 from './_components/Step1';
import Step2 from './_components/Step2';
import { StepProps } from './_types';
import TitleSection from './_components/TitleSection';
import ResultStep from './_components/Result';
import { register } from './_api/register';
import { useRouter } from 'next/navigation';

const pageStyles = `PAGE-CREATE-MODERATOR flex justify-center py-6 w-full min-h-full h-max`;
const containerStyles = `CONTAINER-FORM min-w-[50%] w-max h-max flex bg-gray-900 text-dr-white rounded-lg shadow-xl overflow-hidden border-[1px] border-dr-gray-300 p-4`;

const initialFormData: IRegisterReq = {
    email: '',
    nickname: '',
    password: '',
    rePassword: '',
};

interface IStep {
    guide: string;
    component: React.FC<StepProps | any>;
}

const steps: IStep[] = [
    {
        guide: '회원 정보를 입력하고 닥터스터디의 가족이 되세요.',
        component: Step1,
    },
    {
        guide: '회원 정보가 맞는지 확인하고 제출해주세요.',
        component: Step2,
    },
];

steps.push({
    guide: 'RESULT',
    component: ResultStep,
});

const RegisterPage = () => {
    const title = 'Dr. Study에 가입하기';
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<IRegisterReq>(initialFormData);
    const [isResultPage, setIsResultPage] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<{
        success: boolean | null;
        description: string;
    }>({ success: null, description: '' });

    const router = useRouter();

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

    const handleSubmit = async (e: FormEvent, data: IRegisterReq) => {
        e.preventDefault();
        setIsResultPage(true);
        setLoading(true);
        try {
            const response = await register(data);
            setTimeout(() => {
                setLoading(false);
                setResult({
                    success: true,
                    description: response.data.message,
                });
            }, 2000);
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                '회원 가입 중 오류가 발생했습니다. 다시 시도해주세요.';
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
        <div className={pageStyles}>
            <div className={containerStyles}>
                <div className="h-max min-h-[60vh] w-full flex flex-col justify-start items-center gap-4 ">
                    {!isResultPage && (
                        <TitleSection
                            title={title}
                            guide={steps[currentStep].guide}
                            totalStep={steps.length}
                            currentStep={currentStep}
                        />
                    )}
                    {!isResultPage && (
                        <section className="CONTENTS-SECTION-STEP1 animate-fadeIn w-max min-w-[75%] h-max min-h-[50%] flex flex-col gap-2 transition-all duration-200">
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
                            successMessage="회원 가입이 완료되었습니다!"
                            failMessage="회원 가입에 실패했습니다."
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

export default RegisterPage;
