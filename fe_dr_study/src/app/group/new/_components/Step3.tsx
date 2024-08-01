import React, { FormEvent } from 'react';
import { Button } from '@/components/atoms';
import { StepProps } from '../_types/type';
import { createGroup } from '../../_api/csr';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import { useRouter } from 'next/navigation';
import FieldTagFactory from './FieldTagFactory';

const Step3: React.FC<StepProps> = ({ onNext, onBack, data }) => {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await createGroup(data);
            router.push('/group/1');
        } catch (error) {
            console.error('그룹생성 에러용;;; :' + error);
        }
    };

    return (
        <>
            <div className="w-full h-full flex flex-row justify-around gap-6 items-start mt-2">
                <section className="LEFT-CONTENT w-1/2 h-auto">
                    <div className="w-48 flex flex-col justify-between gap-1 items-center h-auto">
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
                        <div className="w-full max-w-full">
                            <FieldTagFactory
                                postMetaInput={data}
                                setPostMetaInput={() => {}}
                                disabled
                            />
                        </div>
                    </div>
                </section>
                <div className="DIVIDER-VERTICAL w-[1.5px] bg-dr-indigo-200 mx-2 self-stretch"></div>
                <section className="RIGHT-CONTENT w-1/2 h-full">
                    <div className="w-full h-auto flex flex-col justify-between gap-6 items-center">
                        <InputWithLabelAndError
                            id="memberCapacity"
                            label="스터디 그룹 최대 인원수"
                            inputSize="md"
                            name="memberCapacity"
                            value={data.memberCapacity}
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
