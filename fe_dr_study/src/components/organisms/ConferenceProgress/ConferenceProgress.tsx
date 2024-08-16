'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import Carousel from '../Carousel/Carousel';
import { setTimeForAudioRecord } from '@/store/slices/timeForAudioRecord';

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

    return (
        <div className="relative flex flex-col h-full w-full">
            <div className="PROGRESS-CIRCLE absolute w-24 h-24 rounded-full bg-dr-coral-500 top-[-75%] right-[50%] translate-x-12 z-10"></div>
            {/* <div className="PROGRESS-LINE absolute w-88 h-24 rounded-full bg-dr-coral-300 border-b-2 border-dr-coral-300 top-[-75%] right-[50%] translate-x-40 z-0"></div> */}
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] text-dr-white "></div>
            <div className="px-[15%] pt-[0.2rem] mb-4 z-30">
                <div className="h-full z-30">
                    {/* 단계 슬라이드 컴포넌트 */}
                    <Carousel step={phasePage} slides={phaseSlide} />
                </div>
            </div>

            <div className="px-[15%] z-20">
                <div className="h-full">
                    {/* 내용 슬라이드 컴포넌트 */}
                    <Carousel step={step} slides={contentSlide} />
                </div>
            </div>
        </div>
    );
};

export default ConferenceProgress; // ConferenceProgress 컴포넌트를 기본 내보내기로 설정

export const Timer = () => {
    const dispatch = useDispatch();

    const [timer, setTimer] = useState<number>(0); // 초 단위로 설정
    const [width, setWidth] = useState<number>(100); // 바의 초기 길이 비율 (100%)

    const timeForAudioRecord = useSelector(
        (state: RootState) => state.timeForAudioRecord.timeForAudioRecord,
    );

    // useEffect(() => {
    //     let interval: NodeJS.Timeout;
    //     if (timer > 0) {
    //         console.log('in interval');
    //         interval = setInterval(() => {
    //             setTimer((prev) => prev - 1);
    //             setWidth((prev) =>
    //                 prev > 0
    //                     ? ((timer - 1) / (timeForAudioRecord / 1000)) * 100
    //                     : 0,
    //             );
    //         }, 1000); // 1초마다 타이머와 진행 바 동기화

    //         if (timer === 0) {
    //             clearInterval(interval);
    //             console.log('Audio recording stopped');
    //             dispatch(setTimeForAudioRecord(0));
    //         }
    //     }

    //     return () => clearInterval(interval);
    // }, [timer]);

    useEffect(() => {
        console.log('timeForAudioRecord', timeForAudioRecord);
        if (timeForAudioRecord > 0) {
            const initialTime = timeForAudioRecord / 1000; // ms를 초로 변환
            setTimer(initialTime); // 타이머 초기화
            setWidth(100); // 바의 길이 초기화

            setInterval(() => {
                setTimer((prev) => prev - 1);
                console.log('timer:', timer);
            }, 1000);
        }
    }, [timeForAudioRecord]);

    return (
        <div className="flex flex-col justify-center items-center w-[10rem] absolute top-[45%] left-[30%] translate-x-[-50%] translate-y-[-50%] text-slate-200 text-dr-body-3 font-semibold animate-popIn">
            {timeForAudioRecord > 0 && (
                <>
                    <div className="relative w-full rounded-full">
                        <div className="absolute h-[1rem] bg-dr-indigo-200 w-full rounded-full border-2 border-slate-300"></div>
                        <div
                            className="absolute h-[1rem] bg-dr-coral-200 rounded-full border-2 border-slate-300"
                            style={{ width: `${width}%` }} // 타이머에 맞춘 진행 바 길이 설정
                        ></div>
                    </div>
                    {timer > 0 && <p className="mt-2">남은 시간 : {timer}초</p>}
                </>
            )}
        </div>
    );
};
