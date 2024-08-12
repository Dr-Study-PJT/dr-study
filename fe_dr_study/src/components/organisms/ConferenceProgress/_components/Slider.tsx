import { RootState } from '@/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Slider = () => {
    const fullPhase = useSelector(
        (state: RootState) => state.conferenceProgress.programme,
    );

    console.log('fullPhase:', fullPhase);

    const phase = useSelector(
        (state: RootState) => state.conferenceProgress.phase,
    );
    const content = useSelector(
        (state: RootState) => state.conferenceProgress.content,
    );

    useEffect(() => {
        console.log('fullPhase:', fullPhase);
    }, [fullPhase]);

    useEffect(() => {
        console.log('phase:', phase);
        console.log('content:', content);
    }, [phase, content]);

    return (
        <div className="flex justify-center items-center w-full h-full bg-dr-coral-400">
            {[
                {
                    phase: 1,
                    content: '참여자 말하기',
                },
                {
                    phase: 1,
                    content: 'AI 말하기',
                },
                {
                    phase: 2,
                    content: '참여자 말하기',
                },
                {
                    phase: 2,
                    content: 'AI 말하기',
                },
                {
                    phase: 2,
                    content: '참여자 말하기',
                },
                {
                    phase: 2,
                    content: 'AI 말하기',
                },
                {
                    phase: 3,
                    content: '참여자 말하기',
                },
                {
                    phase: 3,
                    content: 'AI 말하기',
                },
                {
                    phase: 3,
                    content: '참여자 말하기',
                },
                {
                    phase: 3,
                    content: 'AI 말하기',
                },
                {
                    phase: 3,
                    content: '참여자 말하기',
                },
                {
                    phase: 3,
                    content: 'AI 말하기',
                },
            ]?.map((phase, index) => (
                <div key={index}>
                    <div>{phase.phase}</div>
                    <div>{phase.content}</div>
                </div>
            ))}
            슬라이더
        </div>
    );
};

export default Slider;
