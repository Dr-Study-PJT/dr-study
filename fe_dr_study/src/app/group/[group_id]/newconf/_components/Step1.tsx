'use client';
import React, { useEffect, useState } from 'react';
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
    validateDueDate,
} from '../_validation';
import { GET } from '@/app/api/routeModule';
import { Moderator } from '@/interfaces/moderator';
import SelectModeratorBox from '@/components/organisms/SelectModeratorBox/SelectModeratorBox';
import { showToast } from '@/utils/toastUtil';

interface CreateConferenceTouchable {
    title?: boolean;
    subject?: boolean;
    memberCapacity?: boolean;
    scheduledTime?: boolean;
}

const Step1: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<CreateConferenceTouchable>({});
    const [moderators, setModerators] = useState<Moderator[]>([]);
    const [selectedModerator, setSelectedModerator] =
        useState<Moderator | null>(null);

    useEffect(() => {
        const handleGetModerators = async () => {
            try {
                const response = await GET(`v1/moderators`, {
                    params: '',
                    isAuth: true,
                    revalidateTime: 10,
                });

                console.log('사회자 리스트 조회 성공:', response);
                const { data } = response;
                setModerators(data);
            } catch (error) {
                console.error('사회자 리스트 조회 실패:', error);
            }
        };
        handleGetModerators();
    }, []);

    const handleChange = (name: string, value: string) => {
        setData({
            ...data,
            [name]: value,
        });

        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));

        let error: string | undefined;
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
            case 'scheduledTime':
                error = validateDueDate();
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleNext = () => {
        console.log(selectedModerator);
        if (!selectedModerator || selectedModerator?.id === -1) {
            showToast('error', 'AI 사회자를 선택해주세요.');
            return;
        }

        if (selectedModerator) {
            setData({
                ...data,
                moderatorId: selectedModerator.id,
            });
        }

        const newErrors = validateForm(data);
        setErrors(newErrors);
        setTouched({
            title: true,
            subject: true,
            memberCapacity: true,
            scheduledTime: true,
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
                        <ImageUpload
                            setData={setData}
                            type="conferences"
                            initialImage={data.imageUrl}
                        />
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
                        <InputWithLabelAndError
                            id="subject"
                            label="컨퍼런스 주제"
                            inputSize="md"
                            name="subject"
                            placeholder="컨퍼런스 주제를 입력해주세요."
                            value={data.subject}
                            onChange={(e) =>
                                handleChange('subject', e.target.value)
                            }
                            error={touched.subject ? errors.subject : undefined}
                        />
                        <SelectModeratorBox
                            selectedModerator={selectedModerator}
                            setSelectedModerator={setSelectedModerator}
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
