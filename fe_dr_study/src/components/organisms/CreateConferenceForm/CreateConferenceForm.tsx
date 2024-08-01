'use client';

import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const loginFormContainerStyles = 'p-8 my-auto';
const loginImageContainerStyles = 'w-1/2 relative';

interface CreateConferenceFormReq {
    studyGroupId: number;
    aiModeratorId: number;
    imageId: number;
    title: string;
    memberCapacity: number;
}

const CreateConferenceForm = () => {
    const HOST_URL = process.env.NEXT_PUBLIC_HOST;

    const [formData, setFormData] = useState<CreateConferenceFormReq>({
        studyGroupId: 1,
        aiModeratorId: 1,
        imageId: 1,
        title: '정보처리기사 컨퍼런스',
        memberCapacity: 10,
    });

    const [errors, setErrors] = useState({
        studyGroupId: '',
        aiModeratorId: '',
        imageId: '',
        title: '',
        memberCapacity: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: '' }); // Clear error on input change
    };

    const onClickLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const request = await fetch(`${HOST_URL}/v1/conferences`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const response = await request.json();
            console.log(response);
        } catch (error) {
            setErrors({
                studyGroupId: '스터디 그룹이 없습니다.',
                aiModeratorId: 'AI 사회자를 선택해주세요.',
                imageId: '스터디 이미지를 선택해주세요.',
                title: '컨퍼런스 제목을 입력해주세요.',
                memberCapacity: '컨퍼런스에 참가할 최대 인원을 설정해주세요.',
            });
        }
    };

    return (
        <div>
            <div className={loginFormContainerStyles}>
                <h2 className="text-center text-dr-header-2 text-dr-coral-200 font-bold mb-6">
                    컨퍼런스 생성
                </h2>
                <form
                    onSubmit={onClickLoginSubmit}
                    className="SECTION-INPUT-LIST flex flex-col gap-4"
                >
                    <InputWithLabelAndError
                        label="스터디 그룹 아이디 입력"
                        type="text"
                        id="studyGroupId"
                        placeholder="스터디 그룹 아이디를 입력해주세요."
                        value={formData.studyGroupId}
                        onChange={handleChange}
                        error={errors.studyGroupId}
                    />
                    <InputWithLabelAndError
                        label="AI 사회자 아이디 입력"
                        type="text"
                        id="aiModeratorId"
                        placeholder="AI 사회자 아이디를 입력해주세요."
                        value={formData.aiModeratorId}
                        onChange={handleChange}
                        error={errors.aiModeratorId}
                    />
                    <InputWithLabelAndError
                        label="이미지 아이디 입력"
                        type="text"
                        id="imageId"
                        placeholder="이미지 아이디를 입력해주세요."
                        value={formData.imageId}
                        onChange={handleChange}
                        error={errors.imageId}
                    />
                    <InputWithLabelAndError
                        label="컨퍼런스 제목 입력"
                        type="text"
                        id="title"
                        placeholder="컨퍼런스 제목을 입력해주세요."
                        value={formData.title}
                        onChange={handleChange}
                        error={errors.title}
                    />
                    <InputWithLabelAndError
                        label="최대 참가 인원 입력"
                        type="text"
                        id="memberCapacity"
                        placeholder="최대 참가 인원을 입력해주세요."
                        value={formData.memberCapacity}
                        onChange={handleChange}
                        error={errors.memberCapacity}
                    />
                    <Button fullWidth type="submit">
                        컨퍼런스 생성
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateConferenceForm;
