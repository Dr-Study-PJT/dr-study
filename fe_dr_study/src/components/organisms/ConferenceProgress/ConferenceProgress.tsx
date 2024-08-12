'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ConferenceControlBarProps {}

const ConferenceProgress = ({}: ConferenceControlBarProps) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const fullPhase = useSelector(
        (state: RootState) => state.conferenceProgress.programme,
    );

    const totalSlides = fullPhase.length;

    const nextSlide = () => {
        if (currentSlide === totalSlides - 1) {
            return;
        }
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    useEffect(() => {
        console.log(fullPhase);
    }, [fullPhase]);

    return (
        <div className="relative flex flex-col items-center justify-center h-full">
            {/* <div className="relative w-full bg-fuchsia-200 overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {fullPhase.map((item, index) => (
                        <div className="w-full flex-shrink-0" key={index}>
                            <div className="text-center">
                                <p>{item.phase}</p>
                            </div>
                        </div>
                    ))}
                    {fullPhase.map((item, index) => (
                        <div className="w-full flex-shrink-0" key={index}>
                            <div className="text-center">
                                <p>{item.content.nickname}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* <div className="flex space-x-4 mt-4">
                <button
                    onClick={nextSlide}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    다음
                </button>
            </div> */}
        </div>
    );
};

export default ConferenceProgress;

{
    /* <div className="flex items-center text-dr-white">
    {fullPhase
        .slice(currentSlide, currentSlide + 5)
        .map((step, index) => (
            <div className="flex items-center" key={index}>
                <div
                    className={`px-4 rounded ${index === 2 ? 'text-dr-header-3' : 'text-dr-gray-100 text-dr-body-3'}`}
                >
                    {step}
                </div>
                {index < steps.length - 1 && (
                    <div className="w-1 h-1 bg-white rounded-full mx-2" />
                )}
            </div>
        ))}
</div> */
}
{
    /* <div className="flex space-x-4 items-center">
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
</div> */
}
