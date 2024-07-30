// src/app/moderator/new/_components/Step1.tsx
import React, { useEffect } from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';
import { StepProps } from './type';
import { LabelCheckboxGroup } from '@/components/organisms/LabelCheckboxGroup';

const Step1: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const handleChange = (name: string, value: string) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    useEffect(() => {
        if (!data.type_model) handleChange('type_model', 'A');
        if (!data.type_voice) handleChange('type_voice', 'A');
        if (!data.type_tone) handleChange('type_tone', 'A');
    }, []);

    return (
        <>
            <div className="w-full h-max flex flex-row justify-around gap-6 items-center">
                <section className="LEFT-CONTENT w-full h-full">
                    <div className="w-full h-full flex flex-col justify-between gap-6 items-center">
                        <div className="rounded-full relative overflow-hidden w-40 h-40">
                            <Image
                                alt="avatar"
                                src="/images/login_thumbnail.png"
                                fill
                                objectFit="cover"
                            />
                        </div>
                        <InputWithLabelAndError
                            id=""
                            label="AI 사회자 이름"
                            inputSize="md"
                            name="name"
                            value={data.name}
                            onChange={(e) =>
                                handleChange('name', e.target.value)
                            }
                        />
                    </div>
                </section>
                <div className="DIVIDER-VERTICAL h-[95%] border-[0.5px] border-dr-indigo-100"></div>
                <section className="RIGHT-CONTENT w-full h-full ">
                    <div className="w-full h-full flex flex-col justify-around gap-6 items-center">
                        <LabelCheckboxGroup
                            groupName="외형 타입"
                            options={[
                                {
                                    id: 'type_model_a',
                                    label: '타입 A',
                                    value: 'A',
                                },
                                {
                                    id: 'type_model_b',
                                    label: '타입 B',
                                    value: 'B',
                                },
                                {
                                    id: 'type_model_c',
                                    label: '타입 C',
                                    value: 'C',
                                },
                            ]}
                            value={data.type_model}
                            onChange={(value) =>
                                handleChange('type_model', value)
                            }
                        />
                        <LabelCheckboxGroup
                            groupName="음성 타입"
                            options={[
                                {
                                    id: 'type_voice_a',
                                    label: '타입 A',
                                    value: 'A',
                                },
                                {
                                    id: 'type_voice_b',
                                    label: '타입 B',
                                    value: 'B',
                                },
                                {
                                    id: 'type_voice_c',
                                    label: '타입 C',
                                    value: 'C',
                                },
                            ]}
                            value={data.type_voice}
                            onChange={(value) =>
                                handleChange('type_voice', value)
                            }
                        />
                        <LabelCheckboxGroup
                            groupName="어조 타입"
                            options={[
                                {
                                    id: 'type_tone_a',
                                    label: '타입 A',
                                    value: 'A',
                                },
                                {
                                    id: 'type_tone_b',
                                    label: '타입 B',
                                    value: 'B',
                                },
                                {
                                    id: 'type_tone_c',
                                    label: '타입 C',
                                    value: 'C',
                                },
                            ]}
                            value={data.type_tone}
                            onChange={(value) =>
                                handleChange('type_tone', value)
                            }
                        />
                    </div>
                </section>
            </div>
            <div className="w-full h-max flex flex-row justify-end gap-2">
                <Button size="md" onClick={onNext}>
                    다음으로
                </Button>
            </div>
        </>
    );
};

export default Step1;
