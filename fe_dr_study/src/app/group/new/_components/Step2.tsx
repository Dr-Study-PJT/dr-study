// src/app/moderator/new/_components/Step1.tsx
import React, { useEffect } from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';
import { StepProps } from './type';
import { LabelCheckboxGroup } from '@/components/organisms/LabelCheckboxGroup';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import e from 'express';

const Step1: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const handleChange = (name: string, value: string) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    useEffect(() => {}, []);

    return (
        <section className="w-2/3 self-center mt-10">
            <div className="w-full h-max flex flex-row justify-around gap-6 items-center">
                <section className="CONTENT w-full h-full flex flex-col gap-5">
                    <div className="flex flex-row justify-between gap-8">
                        <InputWithLabelAndError
                            id="member_capacity"
                            label="스터디 그룹 최대 인원수"
                            inputSize="md"
                            name="member_capacity"
                            value={data.member_capacity}
                            onChange={(e) =>
                                handleChange('member_capacity', e.target.value)
                            }
                        />
                        <InputWithLabelAndError
                            id="due_date"
                            label="목표 종료 기간"
                            inputSize="md"
                            name="due_date"
                            value={data.due_date}
                            onChange={(e) =>
                                handleChange('due_date', e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <TextareaWithLabel
                            id="description"
                            label="스터디 그룹 설명"
                            textareaSize="lg"
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                handleChange('description', e.target.value)
                            }
                        />
                    </div>
                </section>
            </div>
            <div className="w-full h-max flex flex-row justify-end gap-2 my-4">
                <Button size="md" onClick={onBack} color="dark">
                    이전으로
                </Button>
                <Button size="md" onClick={onNext}>
                    다음으로
                </Button>
            </div>
        </section>
    );
};

export default Step1;
