'use client';
import React, { useState } from 'react';
import Step1 from './_components/Step1';
import Step2 from './_components/Step2';

import { CreateFormPageProps, FormData } from './_components/type';
import Step3 from './_components/Step3';
import { ICreateGroupReq } from '../_types';

const pageStyles = `PAGE-CREATE-MODERATOR flex justify-center py-8 w-full min-h-full h-max bg-gray-800 fixed`;
const containerStyles = `CONTAINER-FORM min-w-[50%] w-max h-max flex bg-gray-900 text-dr-white rounded-lg shadow-xl overflow-hidden border-[1px] border-dr-gray-300 p-4`;

const steps = [
    { title: '스터디 그룹 기본정보를 작성해주세요.', component: Step1 },
    {
        title: '스터디 그룹 상세정보를 작성해주세요.',
        component: Step2,
    },
    {
        title: '작성하신 내용이 맞는지 확인하고 제출해주세요.',
        component: Step3,
    },
];

const initialFormData: ICreateGroupReq = {
    name: '',
    description: '',
    goal: '',
    due_date: new Date(),
    member_capacity: 0,
};

const CreateModeratorPage: React.FC<CreateFormPageProps> = () => {
    const title = '스터디 그룹 생성';
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<ICreateGroupReq>(initialFormData);

    const handleNext = () => {
        console.log(formData);
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            console.log(formData);
        }
    };

    const StepComponent = steps[currentStep].component;

    return (
        <div className={pageStyles}>
            <div className={containerStyles}>
                <div className="h-max min-h-[60vh] w-full flex flex-col justify-start items-center gap-4 ">
                    <section className="TITLE-SECTION w-1/2 h-1/4 flex flex-col justify-center">
                        <div className="TITLE-AND-PAHSE items-center flex flex-col justify-center w-full h-max">
                            <div className="TITLE-TEXT text-dr-header-2 font-bold w-full text-center">
                                {title}
                            </div>
                            <div className="SUBTITLE-TEXT text-dr-body-4 font-semibold text-dr-coral-100 w-full text-center">
                                {steps[currentStep].title}
                            </div>
                            <div className="BAR-PHASE mt-8 w-4/6 h-max pb-6">
                                <div className="relative w-full h-max">
                                    <div className="absolute top-[0.375rem] left-0 w-full border-[1px] border-dr-indigo-100 z-0"></div>
                                    <div className="absolute top-0 left-0 w-full flex flex-row justify-around z-10">
                                        {steps.map((_, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`w-3 h-3 bg-dr-coral-300 rounded-full shadow-md border-[1px] transition-colors duration-300 ${i === currentStep ? 'border-dr-white' : 'border-dr-coral-300'}`}
                                                ></div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="CONTENTS-SECTION-STEP1  animate-fadeIn w-max min-w-[75%] h-max min-h-[50%] flex flex-col gap-2 transition-all duration-200">
                        <StepComponent
                            onNext={handleNext}
                            onBack={handleBack}
                            data={formData}
                            setData={setFormData}
                        />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CreateModeratorPage;
