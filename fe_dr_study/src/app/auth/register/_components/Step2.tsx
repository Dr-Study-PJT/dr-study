import React, { FormEvent } from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';

import { StepProps } from '../_types';
import { register } from '../_api/register';
import { useRouter } from 'next/navigation';
import { IRegisterReq } from '@/interfaces/members';

const Step2: React.FC<StepProps> = ({
    onNext,
    onBack,
    onSubmit,
    data,
    setData,
}) => {
    const router = useRouter();

    return (
        <section className="w-2/3 self-center">
            <div className="w-full h-max flex flex-row justify-around gap-6 items-center">
                <section className="CONTENT w-full h-full flex flex-col gap-5 items-center">
                    <div className="rounded-full relative overflow-hidden w-24 h-24">
                        <Image
                            alt="avatar"
                            src="/images/login_thumbnail.png"
                            fill
                            objectFit="cover"
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <InputWithLabelAndError
                            id="email"
                            label="이메일 입력"
                            inputSize="md"
                            name="email"
                            value={data.email}
                            disabled
                        />
                        <InputWithLabelAndError
                            id="nickname"
                            label="닉네임 입력"
                            inputSize="md"
                            name="nickname"
                            value={data.nickname}
                            disabled
                        />
                    </div>
                </section>
            </div>
            <div className="w-full h-max flex flex-row justify-end gap-2 my-6">
                <Button size="md" onClick={onBack} color="dark">
                    이전으로
                </Button>
                <Button
                    size="md"
                    onClick={(e) => {
                        onSubmit(e, data);
                    }}
                >
                    가입하기
                </Button>
            </div>
        </section>
    );
};

export default Step2;
