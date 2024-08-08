import React, { useState } from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { StepProps } from '../_types';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import {
    ValidationErrors,
    validateForm,
    validateTitle,
    validateSubject,
    validateMemberCapacity,
} from '../_validation';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';

interface CreateConferenceTouchable {
    title?: boolean;
    subject?: boolean;
    memberCapacity?: boolean;
}

const Step1: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<CreateConferenceTouchable>({});

    const handleChange = (name: string, value: string) => {
        setData({
            ...data,
            [name]: value,
        });

        // 필드가 터치되었음을 표시합니다잉
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));

        // 실시간 유효성 검사 수행함니다잉
        let error: string | undefined;
        console.log(value, 'value');
        switch (name) {
            case 'title':
                error = validateTitle(value);
                break;
            case 'subject':
                error = validateSubject(value);
                break;
            case 'memberCapacity':
                error = validateMemberCapacity(value);
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleNext = () => {
        const newErrors = validateForm(data);
        setErrors(newErrors);
        setTouched({
            title: true,
            subject: true,
            memberCapacity: true,
        });

        if (Object.values(newErrors).every((error) => !error)) {
            onNext();
        }
    };

    return (
        <section className="w-2/3 self-center">
            <div className="w-full min-h-48 h-max flex flex-row justify-around gap-6 items-center">
                <section className="CONTENT w-full h-full flex flex-col gap-5">
                    <div className="w-full h-full flex flex-col justify-between gap-3 items-center">
                        <ImageUpload setData={setData} type="groups" />
                    </div>

                    <div className="flex flex-col gap-4">
                        <InputWithLabelAndError
                            id="title"
                            label="컨퍼런스 제목"
                            inputSize="md"
                            name="title"
                            placeholder="컨퍼런스 제목을 입력해주세요."
                            value={data.title}
                            onChange={(e) =>
                                handleChange('title', e.target.value)
                            }
                            error={touched.title ? errors.title : undefined}
                        />
                        <InputWithLabelAndError
                            id="memberCapacity"
                            label="컨퍼런스 최대 참여 인원"
                            inputSize="md"
                            type="number"
                            name="memberCapacity"
                            placeholder="컨퍼런스 최대 참여 인원을 입력해주세요."
                            value={data.memberCapacity}
                            onChange={(e) =>
                                handleChange('memberCapacity', e.target.value)
                            }
                            error={
                                touched.memberCapacity
                                    ? errors.memberCapacity
                                    : undefined
                            }
                        />

                        <TextareaWithLabel
                            id="subject"
                            label="컨퍼런스 주제"
                            textareaSize="md"
                            name="subject"
                            placeholder="컨퍼런스 주제를 입력해주세요."
                            value={data.subject}
                            onChange={(e) =>
                                handleChange('subject', e.target.value)
                            }
                            error={touched.subject ? errors.subject : undefined}
                        />
                    </div>
                </section>
            </div>
            <div className="w-full h-max flex flex-row justify-end gap-2 my-4">
                <Button size="md" onClick={handleNext}>
                    다음으로
                </Button>
            </div>
        </section>
    );
};

export default Step1;
