import React from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';

import { StepProps } from '../_types';
import { getBackgroundColorRandomPastel } from '@/utils/colors';

const Step2: React.FC<StepProps> = ({ onNext, onBack, onSubmit, data }) => {
    // 이미지 URL이 없을 경우 기본 이미지 경로를 설정
    const imageUrl = data.imageUrl || '/images/placeholder.png';

    return (
        <section className="w-2/3 self-center">
            <div className="w-full h-max flex flex-row justify-around gap-6 items-center">
                <section className="CONTENT w-full h-full flex flex-col gap-5 items-center">
                    <div
                        className={`rounded-full relative overflow-hidden w-24 h-24 ${getBackgroundColorRandomPastel()} transition-colors duration-300`}
                    >
                        <Image alt="" src={imageUrl} fill objectFit="cover" />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <InputWithLabelAndError
                            id="email"
                            label="이메일"
                            inputSize="md"
                            name="email"
                            value={data.email}
                            disabled
                        />
                        <InputWithLabelAndError
                            id="nickname"
                            label="닉네임"
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
