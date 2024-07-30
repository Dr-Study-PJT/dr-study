import React, { FormEvent } from 'react';
import { Button, Label } from '@/components/atoms';
import { StepProps } from './type';
import { createGroup } from '../../_api';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';
import { LabelCheckboxGroup } from '@/components/organisms/LabelCheckboxGroup';
import { Textarea } from '@/components/atoms/Textarea';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';

const Step3: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await createGroup(data);
    };

    return (
        <>
            <div className="w-full h-full flex flex-row justify-around gap-6 items-center mt-2">
                <section className="LEFT-CONTENT w-full h-full">
                    <div className="w-full h-full flex flex-col justify-between gap-6 items-center">
                        <div className="rounded-full relative overflow-hidden w-24 h-24">
                            <Image
                                alt="avatar"
                                src="/images/login_thumbnail.png"
                                fill
                                objectFit="cover"
                            />
                        </div>
                        <InputWithLabelAndError
                            id="name"
                            label="스터디 그룹명"
                            inputSize="md"
                            name="name"
                            value={data.name}
                            disabled
                        />
                        <InputWithLabelAndError
                            id="goal"
                            label="스터디 그룹 목표"
                            inputSize="md"
                            name="goal"
                            value={data.goal}
                            disabled
                        />
                    </div>
                </section>
                <div className="DIVIDER-VERTICAL h-auto border-[1px] border-dr-indigo-100"></div>
                <section className="RIGHT-CONTENT w-full h-auto">
                    <div className="w-full h-full flex flex-col justify-between gap-6 items-center">
                        <InputWithLabelAndError
                            id="member_capacity"
                            label="스터디 그룹 최대 인원수"
                            inputSize="md"
                            name="member_capacity"
                            value={data.member_capacity}
                            disabled
                        />
                        <TextareaWithLabel
                            id="description"
                            label="스터디 그룹 설명"
                            textareaSize="lg"
                            name="description"
                            value={data.description}
                            disabled
                        />
                    </div>
                </section>
            </div>
            <div className="w-full h-max flex flex-row justify-end gap-2 my-4">
                <Button size="md" onClick={onBack} color="dark">
                    이전으로
                </Button>
                <Button size="md" onClick={handleSubmit}>
                    그룹 만들기
                </Button>
            </div>
        </>
    );
};

export default Step3;
