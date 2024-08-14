// fe_dr_study/src/app/group/new/_components/Step1.tsx
// (Step1 컴포넌트는 이미 수정된 ImageUpload 컴포넌트를 사용합니다.)

import React, { useEffect } from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { StepProps } from '../_types/type';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';

const Step1: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const handleChange = (name: string, value: string) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    return (
        <section className="w-[70%] self-center mt-3">
            <div className="w-full h-max flex flex-col justify-around gap-6 items-center">
                <section className="CONTENT w-full h-full flex flex-col gap-5">
                    <div className="w-full h-full flex flex-col justify-between gap-3 items-center">
                        <ImageUpload
                            setData={setData}
                            type="groups"
                            initialImage={data.imageUrl}
                        />
                    </div>

                    <div className="flex flex-col gap-4 w-full">
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
                                type="number"
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
                    <div className="w-full h-max flex flex-row justify-end gap-2 my-4">
                        <Button size="md" onClick={onNext}>
                            다음으로
                        </Button>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Step1;
