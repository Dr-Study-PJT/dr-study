import React, { useState } from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { StepProps } from '../_types';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import {
    validateEmail,
    validateNickname,
    validatePassword,
    validateRePassword,
    ValidationErrors,
    validateForm,
} from '../_validation';
import { IRegisterReq } from '@/interfaces/members';

const Step1: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<
        Partial<Record<keyof IRegisterReq, boolean>>
    >({});

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
            case 'email':
                error = validateEmail(value);
                break;
            case 'nickname':
                error = validateNickname(value);
                break;
            case 'password':
                error = validatePassword(value);
                break;
            case 'rePassword':
                error = validateRePassword(data.password, value);
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
            email: true,
            nickname: true,
            password: true,
            rePassword: true,
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
                            initialImage={data.imageUrl}
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
                            error={touched.email ? errors.email : undefined}
                        />
                        <InputWithLabelAndError
                            id="nickname"
                            label="닉네임 입력"
                            inputSize="md"
                            name="nickname"
                            placeholder="닉네임을 입력해주세요."
                            value={data.nickname}
                            onChange={(e) =>
                                handleChange('nickname', e.target.value)
                            }
                            error={
                                touched.nickname ? errors.nickname : undefined
                            }
                        />
                        <InputWithLabelAndError
                            id="password"
                            label="비밀번호 입력"
                            inputSize="md"
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력해주세요."
                            value={data.password}
                            onChange={(e) =>
                                handleChange('password', e.target.value)
                            }
                            error={
                                touched.password ? errors.password : undefined
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
                            error={
                                touched.rePassword
                                    ? errors.rePassword
                                    : undefined
                            }
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
