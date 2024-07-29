import React from 'react';
import { Button, Label } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import { StepProps } from './type';
import { LabelCheckboxGroup } from '@/components/organisms/LabelCheckboxGroup';
import Image from 'next/image';

const Step2: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    return (
        <>
            <div className="w-full h-max flex flex-row justify-around gap-6 items-center">
                <section className="LEFT-CONTENT w-3/5 h-full">
                    <div className="AVATAR-CARD w-full h-full !bg-dr-coral-500 p-2 rounded-sm border-[1px] border-dr-gray-100">
                        <div className="w-full h-full flex flex-col justify-between gap-6">
                            <div className="w-full h-max flex flex-col justify-between items-center gap-2">
                                <div className="rounded-full relative overflow-hidden w-24 h-24 self-center">
                                    <Image
                                        alt="avatar"
                                        src="/images/login_thumbnail.png"
                                        fill
                                        objectFit="cover"
                                    />
                                </div>
                                <Label
                                    htmlFor=""
                                    key={''}
                                    className="text-dr-white font-semibold !text-dr-body-3"
                                >
                                    {data.name}
                                </Label>
                            </div>
                            <div className="w-full min-h-24 h-max rounded-md bg-dr-coral-400 p-2">
                                <div className="text-dr-body-5 text-dr-gray-100 w-full h-max break-words">
                                    사전프롬프트가 무엇인지 안내하는 가이드글이
                                    줄줄줄줄 써있음...
                                </div>
                                <div className="text-dr-body-5 text-dr-gray-100 w-full h-max break-words">
                                    사전프롬프트가 무엇인지 안내하는 가이드글이
                                    줄줄줄줄 써있음...
                                </div>
                                <div className="text-dr-body-5 text-dr-gray-100 w-full h-max break-words">
                                    사전프롬프트가 무엇인지 안내하는 가이드글이
                                    줄줄줄줄 써있음...
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="DIVIDER-VERTICAL h-[95%] border-[0.5px] border-dr-indigo-100"></div>
                <section className="RIGHT-CONTENT w-full h-full">
                    <div className="w-full h-full flex flex-col gap-6 items-center justify-between">
                        <InputWithLabelAndError
                            id="description"
                            label="AI 사회자 설명"
                            inputSize="md"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                        />
                        <TextareaWithLabel
                            id="pre_prompt"
                            label="사전학습 프롬프트 입력"
                            textareaSize="lg"
                            name="pre_prompt"
                            value={data.pre_prompt}
                            onChange={handleChange}
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
