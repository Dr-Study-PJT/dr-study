// src/app/moderator/new/_components/Step1.tsx
import React, { useEffect } from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';
import { StepProps } from '../_types/type';
import { LabelCheckboxGroup } from '@/components/organisms/LabelCheckboxGroup';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';

const Step1: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const handleChange = (name: string, value: string) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    useEffect(() => {}, []);

    return (
        <section className="w-2/3 self-center">
            <div className="w-full h-max flex flex-row justify-around gap-6 items-center">
                <section className="CONTENT w-full h-full flex flex-col gap-5">
                    <div className="w-full h-full flex flex-col justify-between gap-3 items-center">
                        <ImageUpload
                        // bodyData={bodyData}
                        // setBodyData={setBodyData}
                        // setImageDisplay={setImageDisplay}
                        />
                        {/* 
                        <div className="rounded-full relative overflow-hidden w-40 h-40">
                        {imageDisplay && (
                            <div className="w-28 h-28">
                                <Image
                                    alt="Uploaded"
                                    src={imageDisplay}
                                    fill
                                    objectFit="cover"
                                />
                            
                        )}
                        </div>
                        */}
                    </div>

                    <div className="flex flex-col gap-4">
                        <InputWithLabelAndError
                            id="name"
                            label="스터디 그룹명"
                            inputSize="md"
                            name="name"
                            value={data.name}
                            onChange={(e) =>
                                handleChange('name', e.target.value)
                            }
                        />
                        <InputWithLabelAndError
                            id="goal"
                            label="스터디 그룹 목표"
                            inputSize="md"
                            name="goal"
                            value={data.goal}
                            onChange={(e) =>
                                handleChange('goal', e.target.value)
                            }
                        />
                    </div>
                </section>
            </div>
            <div className="w-full h-max flex flex-row justify-end gap-2 my-4">
                <Button size="md" onClick={onNext}>
                    다음으로
                </Button>
            </div>
        </section>
    );
};

export default Step1;
