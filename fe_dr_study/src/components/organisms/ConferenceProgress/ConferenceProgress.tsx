'use client';

import { useState } from 'react';

interface ConferenceControlBarProps {}

const ConferenceProgress = ({}: ConferenceControlBarProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [currentPresenter, setCurrentPresenter] = useState(0);

    const steps = ['1단계', '2단계', '3단계', '4단계', '5단계'];
    const presenters = [
        '진행자A',
        '진행자B',
        '사회자',
        '진행자A',
        '진행자B',
        '사회자',
    ];

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center text-dr-white">
                {steps
                    .slice(currentStep, currentStep + 5)
                    .map((step, index) => (
                        <div className="flex items-center" key={index}>
                            <div
                                className={`px-4 rounded ${index === 2 ? 'text-dr-header-3' : 'text-dr-gray-100 text-dr-body-3'}`}
                            >
                                {step}
                            </div>
                            {/* 단계 사이에 점 추가 */}
                            {index < steps.length - 1 && (
                                <div className="w-1 h-1 bg-white rounded-full mx-2" />
                            )}
                        </div>
                    ))}
            </div>
            <div className="flex space-x-4 items-center">
                {presenters
                    .slice(currentPresenter, currentPresenter + 7)
                    .map((presenter, index) => (
                        <div
                            key={index}
                            className={`px-4 py-1 rounded ${
                                index === 2
                                    ? 'text-dr-body-1 font-bold text-dr-coral-500'
                                    : index === 0 || index === 1
                                      ? 'text-dr-body-4 text-dr-gray-300'
                                      : 'text-dr-body-4 text-dr-coral-300'
                            }`}
                        >
                            {presenter}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ConferenceProgress;