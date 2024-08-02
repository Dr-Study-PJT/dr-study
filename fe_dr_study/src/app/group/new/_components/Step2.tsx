import React, { useEffect } from 'react';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { StepProps } from '../_types/type';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import FieldTagFactory from './FieldTagFactory';

const Step2: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const handleChange = (name: string, value: string) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    useEffect(() => {}, []);

    return (
        <section className="w-2/3 self-center mt-6">
            <div className="w-max h-max flex flex-row justify-around gap-6 items-center">
                <section className="CONTENT w-full h-full flex flex-col gap-4 w-64">
                    <TextareaWithLabel
                        id="description"
                        label="스터디 그룹 설명"
                        textareaSize="lg"
                        name="description"
                        value={data.description}
                        onChange={(e) =>
                            handleChange('description', e.target.value)
                        }
                    />
                    <FieldTagFactory
                        postMetaInput={data}
                        setPostMetaInput={setData}
                    />
                </section>
            </div>
            <div className="w-full h-max flex flex-row justify-end gap-2 my-5">
                <Button size="md" onClick={onBack} color="dark">
                    이전으로
                </Button>
                <Button size="md" onClick={onNext}>
                    다음으로
                </Button>
            </div>
        </section>
    );
};

export default Step2;