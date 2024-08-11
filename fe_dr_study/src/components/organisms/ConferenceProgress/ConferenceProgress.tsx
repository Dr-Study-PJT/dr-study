'use client';

import { useState } from 'react';
import Slider from './_components/Slider';

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
        '진행자A',
        '진행자B',
        '사회자',
        '진행자A',
        '진행자B',
        '사회자',
    ];

    return (
        <div className="relative flex flex-col items-center justify-center h-full">
            {/* <div className="absolute top-0 left-0 w-full h-full">
                <Slider />
            </div> */}
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
