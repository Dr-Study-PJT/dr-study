import React, { useEffect } from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';
import { StepProps } from '../_types/type';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import FieldTagFactory from './FieldTagFactory';

const Step1: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const handleChange = (name: string, value: string) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    useEffect(() => {}, []);

    return (
        <section className="w-2/3 self-center mt-3">
            <div className="w-max h-max flex flex-row justify-around gap-6 items-center">
                <section className="CONTENT w-full h-full flex flex-col gap-5">
                    <div className="w-full h-full flex flex-col justify-between gap-3 items-center">
                        <ImageUpload />
                    </div>

                    <div className="flex flex-col gap-4 w-64">
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

                        <div className="flex flex-row justify-between gap-8">
                            <InputWithLabelAndError
                                id="memberCapacity"
                                label="스터디 그룹 최대 인원수"
                                inputSize="md"
                                name="memberCapacity"
                                value={data.memberCapacity}
                                onChange={(e) =>
                                    handleChange(
                                        'memberCapacity',
                                        e.target.value,
                                    )
                                }
                            />
                            <InputWithLabelAndError
                                id="dueDate"
                                label="목표 종료 기간"
                                inputSize="md"
                                name="dueDate"
                                value={data.dueDate}
                                onChange={(e) =>
                                    handleChange('dueDate', e.target.value)
                                }
                            />
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-auto h-max flex flex-row justify-end gap-2 my-4">
                <Button size="md" onClick={onNext}>
                    다음으로
                </Button>
            </div>
        </section>
    );
};

export default Step1;
