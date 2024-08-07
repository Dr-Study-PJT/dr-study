'use client';

import { POST } from '@/app/api/routeModule';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { groupAPI as API, conferenceAPI } from '@/app/api/axiosInstanceManager';
import { useRouter } from 'next/navigation';

const loginFormContainerStyles = 'p-8 my-auto';
const loginImageContainerStyles = 'w-1/2 relative';

interface CreateConferenceFormReq {
    studyGroupId: string;
    moderatorId: string;
    imageId: string;
    title: string;
    subject: string;
    memberCapacity: string;
}

const CreateConferenceForm = () => {
    const router = useRouter();

    const HOST_URL = process.env.NEXT_PUBLIC_HOST;

    const [formData, setFormData] = useState<CreateConferenceFormReq>({
        studyGroupId: '',
        moderatorId: '',
        imageId: '',
        title: '',
        subject: '',
        memberCapacity: '',
    });

    const [errors, setErrors] = useState({
        studyGroupId: '',
        moderatorId: '',
        imageId: '',
        title: '',
        subject: '',
        memberCapacity: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: '' }); // Clear error on input change
    };

    const onSubmitCreateConference = async (e: FormEvent) => {
        e.preventDefault();
        try {
            console.log('formData:', formData);
            const response = await POST({
                API: conferenceAPI,
                endPoint: '',
                body: formData,
                isAuth: true,
            });
            const { conferenceId } = response.data;
            console.log('컨퍼런스 생성 성공:', conferenceId);
            router.push(`/conference/${conferenceId}/info`);
        } catch (error) {
            setErrors({
                studyGroupId: '스터디 그룹이 없습니다.',
                moderatorId: 'AI 사회자를 선택해주세요.',
                imageId: '스터디 이미지를 선택해주세요.',
                title: '컨퍼런스 제목을 입력해주세요.',
                subject: '컨퍼런스 제목을 입력해주세요.',
                memberCapacity: '최대 참가 인원은 16명입니다.',
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
                    onSubmit={onSubmitCreateConference}
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
                        id="moderatorId"
                        placeholder="AI 사회자 아이디를 입력해주세요."
                        value={formData.moderatorId}
                        onChange={handleChange}
                        error={errors.moderatorId}
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
                        label="컨퍼런스 주제 입력"
                        type="text"
                        id="subject"
                        placeholder="컨퍼런스 주제를 입력해주세요."
                        value={formData.subject}
                        onChange={handleChange}
                        error={errors.subject}
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
