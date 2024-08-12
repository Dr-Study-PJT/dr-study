import { RootState } from '@/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface SliderProps {
    programme: any;
}

const Slider = ({ programme }: SliderProps) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    return (
        <div className="flex justify-center items-center w-full h-full bg-dr-coral-400">
            {programme?.map((item: string, index: number) => (
                <div key={index}>
                    <div>{item}</div>
                </div>
            ))}
            슬라이더
        </div>
    );
};

export default Slider;
