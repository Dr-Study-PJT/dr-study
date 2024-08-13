'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './swiper.css';

interface CarouselProps {
    step: number;
    slides: any[];
}
const Carousel = ({ step, slides }: CarouselProps) => {
    const [my_swiper, set_my_swiper] = useState<any>(null);

    // step이 변경될 때마다 다음 슬라이드로 이동
    useEffect(() => {
        if (my_swiper) {
            my_swiper.slideNext();
        }
    }, [step]);

    const isPhaseSlide = typeof slides[0]?.phase === 'number';

    return (
        <Swiper
            onInit={(swiper) => {
                set_my_swiper(swiper);
            }}
            navigation={true}
            slidesPerView={isPhaseSlide ? 5 : 7}
            spaceBetween={30}
            centeredSlides={true}
            allowTouchMove={false}
        >
            {slides[0] !== 0 &&
                slides?.map((slide, index) =>
                    typeof slide === 'number' ? (
                        // 단계 슬라이드
                        <SwiperSlide key={index}>
                            <div className="text-dr-white">{slide}단계</div>
                        </SwiperSlide>
                    ) : (
                        // 내용 슬라이드
                        <SwiperSlide key={index}>
                            <div
                                className={`text-dr-coral-200 ${index < step && 'text-dr-gray-300'}`}
                            >
                                {slide}
                            </div>
                        </SwiperSlide>
                    ),
                )}
        </Swiper>
    );
};

export default Carousel;
