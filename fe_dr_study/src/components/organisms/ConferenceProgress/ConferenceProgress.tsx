'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import Carousel from '../Carousel/Carousel';
import { setNextStep } from '@/store/slices/conferenceProgressSlice';

interface Phase {
    id: number; // 단계 ID
    title: string; // 단계 제목
}

const ConferenceProgress = () => {
    const programme = useSelector(
        (state: RootState) => state.conferenceProgress.programme,
    ) as any;
    const step = useSelector(
        (state: RootState) => state.conferenceProgress.step,
    );

    // 슬라이드 상태 초기화
    const [phaseSlide, setPhaseSlide] = useState<Phase[]>([]);
    const [contentSlide, setContentSlide] = useState<any[]>([]);

    // 페이지 상태 초기화
    const [phasePage, setPhasePage] = useState<number>(0);
    const [contentPage, setContentPage] = useState<number>(0);

    useEffect(() => {
        if (programme) {
            // 중복 제거한 단계 배열 생성
            const phases = Object.keys(programme)
                .map((key) => programme[key].phase)
                .filter((value, index, self) => self.indexOf(value) === index);
            setPhaseSlide(phases);
            setContentSlide(
                Object.keys(programme).map(
                    (key: string) => programme[key].content.nickname,
                ),
            );
        }
    }, [programme]);

    useEffect(() => {
        // step이 변경될 때마다 페이지 상태를 업데이트
        if (programme) {
            // 이전 step의 phase와 현재 step의 phase가 다르면 phasePage를 +1
            if (
                programme.length > 1 &&
                programme[step - 1]?.phase !== programme[step]?.phase
            ) {
                setPhasePage(phasePage + 1); // 단계 페이지 업데이트
            }
            setContentPage(contentPage + 1); // 내용 페이지 업데이트
        }
    }, [step]);

    // const dispatch = useDispatch();

    return (
        <div className="flex flex-col h-full ">
            {/* <button
                className="bg-dr-red"
                onClick={() => dispatch(setNextStep())} // 다음 단계로 이동하는 버튼
            >
                dd
            </button> */}
            <div className="px-[15%] pt-[0.3rem]">
                <div className="h-full">
                    {/* 단계 슬라이드 컴포넌트 */}
                    <Carousel step={phasePage} slides={phaseSlide} />
                </div>
            </div>

            <div className="px-[15%]">
                <div className="h-full">
                    {/* 내용 슬라이드 컴포넌트 */}
                    <Carousel step={step} slides={contentSlide} />
                </div>
            </div>
        </div>
    );
};

export default ConferenceProgress; // ConferenceProgress 컴포넌트를 기본 내보내기로 설정
