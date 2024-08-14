import React, { useEffect, useState, useRef } from 'react';
import { Button, Label } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import { StepProps } from './type';
import { prePromptPresets } from './_preset/prePromptPresets';

const Step2: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const leftContentRef = useRef<HTMLDivElement>(null);
    const [leftContentHeight, setLeftContentHeight] = useState<number | null>(
        null,
    );
    const [selectedPresetId, setSelectedPresetId] = useState<number | null>(
        null,
    );

    useEffect(() => {
        if (leftContentRef.current) {
            setLeftContentHeight(leftContentRef.current.clientHeight);
        }
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
        // 사용자가 입력 필드를 수정할 경우 프리셋 선택 해제
        setSelectedPresetId(null);
    };

    const handlePresetClick = (preset: {
        id: number;
        description: string;
        prePrompt: string;
    }) => {
        setData({
            ...data,
            description: preset.description,
            prePrompt: preset.prePrompt,
        });
        setSelectedPresetId(preset.id); // 프리셋 선택 상태 저장
    };

    return (
        <>
            <div className="w-full flex flex-row justify-around gap-6">
                <section className="LEFT-CONTENT w-3/5" ref={leftContentRef}>
                    <div className="pb-4">
                        <Label
                            htmlFor=""
                            className="text-dr-black font-bold mb-2 px-2"
                        >
                            사전 프롬프트 프리셋 목록
                        </Label>
                        <div className="text-dr-body-4 text-dr-gray-100 px-2 pr-4">
                            간편하게 설명과 사전학습 프롬프트를 넣어보세요.
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 bg-dr-indigo-300 p-2 rounded-md">
                        {prePromptPresets.map((preset) => (
                            <div
                                key={preset.id}
                                className={`PREPROMPT-CARD w-full p-4 rounded-md border-[2px] cursor-pointer bg-dr-coral-300 hover:bg-dr-coral-100 transition-all ${
                                    selectedPresetId === preset.id
                                        ? 'border-dr-coral-50'
                                        : 'border-dr-coral-300'
                                } bg-dr-gray-50`}
                                onClick={() =>
                                    handlePresetClick({
                                        id: preset.id,
                                        description: preset.description,
                                        prePrompt: preset.prePrompt,
                                    })
                                }
                            >
                                <h3 className="text-dr-body-4 font-bold text-dr-white mb-2">
                                    {preset.title}
                                </h3>
                                <p className="text-dr-body-5 text-dr-gray-100">
                                    {preset.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
                <div className="DIVIDER-VERTICAL h-full border-[0.5px] border-dr-indigo-100"></div>
                <section
                    className="RIGHT-CONTENT w-full"
                    style={{ minHeight: leftContentHeight || 'auto' }}
                >
                    <div className="w-full h-full flex flex-col gap-6 items-center justify-between">
                        <InputWithLabelAndError
                            id="description"
                            label="AI 사회자 설명"
                            inputSize="md"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            placeholder={`${data.name} 사회자의 특징을 설명해주세요.`}
                        />
                        <TextareaWithLabel
                            id="prePrompt"
                            label="사전학습 프롬프트 입력"
                            fullHeight
                            textareaSize="fullHeight"
                            name="prePrompt"
                            value={data.prePrompt}
                            onChange={handleChange}
                            placeholder="AI가 사회 기법, 스터디 진행 단계, 단계별 역할 등을 인지할 수 있도록 자세히 설명해주세요."
                        />
                    </div>
                </section>
            </div>
            <div className="w-full h-max flex flex-row justify-end gap-2">
                <Button size="md" onClick={onBack} color="dark">
                    이전으로
                </Button>
                <Button size="md" onClick={onNext}>
                    다음으로
                </Button>
            </div>
        </>
    );
};

export default Step2;
