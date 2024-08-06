import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';

import { StepProps } from '../_types';
import { useRouter } from 'next/navigation';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';

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
                            id="title"
                            label="컨퍼런스 제목"
                            inputSize="md"
                            name="title"
                            value={data.title}
                            disabled
                        />
                        <InputWithLabelAndError
                            id="memberCapacity"
                            label="컨퍼런스 최대 참여 인원"
                            inputSize="md"
                            name="memberCapacity"
                            value={data.memberCapacity}
                            disabled
                        />
                        <TextareaWithLabel
                            id="subject"
                            label="컨퍼런스 주제"
                            textareaSize="md"
                            name="subject"
                            value={data.subject}
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
                    생성하기
                </Button>
            </div>
        </section>
    );
};

export default Step2;
