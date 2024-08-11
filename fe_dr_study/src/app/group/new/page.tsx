'use client';
import React, { FormEvent, useState } from 'react';
import Step1 from './_components/Step1';
import Step2 from './_components/Step2';
import Step3 from './_components/Step3';
import ResultStep from './_components/Result';
import { ICreateGroupReq, StepProps } from './_types/type';
import { createGroup } from '../_api/csr';
import { useRouter } from 'next/navigation';
import TitleSection from '@/app/auth/register/_components/TitleSection';

const pageStyles = `PAGE-CREATE-MODERATOR flex justify-center py-8 w-full min-h-full h-max bg-dr-indigo-100`;
const containerStyles = `CONTAINER-FORM min-w-[50%] w-max h-max flex bg-gray-900 text-dr-white rounded-lg shadow-xl overflow-hidden border-[1px] border-dr-gray-300 p-4`;

interface IStep {
    guide: string;
    component: React.FC<StepProps | any>;
}

const steps: IStep[] = [
    { guide: '스터디 그룹 기본정보를 작성해주세요.', component: Step1 },
    {
        guide: '스터디 그룹 상세정보를 작성해주세요.',
        component: Step2,
    },
    {
        guide: '작성하신 내용이 맞는지 확인하고 제출해주세요.',
        component: Step3,
    },
];
steps.push({
    guide: 'RESULT',
    component: ResultStep,
});

const initialFormData: ICreateGroupReq = {
    name: '',
    description: '',
    tags: [],
    dueDate: new Date(),
    memberCapacity: 0,
};

const CreateGroupPage: React.FC = () => {
    const router = useRouter();

    const title = '스터디 그룹 생성';
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<ICreateGroupReq>(initialFormData);
    const [isResultPage, setIsResultPage] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<{
        id: number | null;
        success: boolean | null;
        description: string;
    }>({ id: null, success: null, description: '' });

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
            // 그룹 생성 API 호출
            const response = await createGroup(formData);
            console.log(response.data);
            setTimeout(() => {
                setLoading(false);
                setResult({
                    id: response?.data?.groupId,
                    success: true,
                    description: '그룹 생성이 완료되었습니다!',
                });
            }, 2000);
        } catch (error: any) {
            setTimeout(() => {
                setLoading(false);
                setResult({
                    id: null,
                    success: false,
                    description:
                        '그룹 생성 중 오류가 발생했습니다. 다시 시도해주세요.',
                });
            }, 2000);
        }
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
                            successMessage="스터디 그룹 생성이 완료되었습니다!"
                            failMessage="스터디 그룹 생성에 실패했습니다."
                            onHomeClick={() => router.push('/')}
                            onFailureEditClick={handleRetry}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateGroupPage;
