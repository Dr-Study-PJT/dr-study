// src/app/moderator/new/_components/Step1.tsx
import React, { useEffect } from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { StepProps } from '../_types';
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
            <div className="w-full min-h-48 h-max flex flex-row justify-around gap-6 items-center">
                <section className="CONTENT w-full h-full flex flex-col gap-5">
                    <div className="w-full h-full flex flex-col justify-between gap-3 items-center">
                        <ImageUpload
                        // bodyData={bodyData}
                        // setBodyData={setBodyData}
                        // setImageDisplay={setImageDisplay}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <InputWithLabelAndError
                            id="email"
                            label="이메일 입력"
                            inputSize="md"
                            name="email"
                            placeholder="이메일을 입력해주세요."
                            value={data.email}
                            onChange={(e) =>
                                handleChange('email', e.target.value)
                            }
                        />
                        <InputWithLabelAndError
                            id="goal"
                            label="닉네임 입력"
                            inputSize="md"
                            name="nickname"
                            placeholder="닉네임을 입력해주세요."
                            value={data.nickname}
                            onChange={(e) =>
                                handleChange('nickname', e.target.value)
                            }
                        />
                        <InputWithLabelAndError
                            id="password"
                            label="password"
                            inputSize="md"
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력해주세요."
                            value={data.password}
                            onChange={(e) =>
                                handleChange('password', e.target.value)
                            }
                        />
                        <InputWithLabelAndError
                            id="rePassword"
                            label="비밀번호 재입력"
                            inputSize="md"
                            type="password"
                            name="rePassword"
                            placeholder="비밀번호를 다시한번 입력해주세요."
                            value={data.rePassword}
                            onChange={(e) =>
                                handleChange('rePassword', e.target.value)
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
