import React, { FormEvent } from 'react';
import { Button, Label } from '@/components/atoms';
import { StepProps } from './type';
import { createModerator } from '../../_api/csr';
import { useRouter } from 'next/navigation';

const Step4: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await createModerator(data);
            router.push('/group/1');
        } catch {
            console.error('실패 에반데;;');
        }
    };

    return (
        <>
            <div className="w-full h-max flex flex-row justify-around gap-6 items-center">
                제출 페이지
            </div>
            <div className="w-full h-max flex flex-row justify-end gap-2">
                <Button size="md" onClick={onBack} color="dark">
                    이전으로
                </Button>
                <Button size="md" onClick={handleSubmit}>
                    제출하기
                </Button>
            </div>
        </>
    );
};

export default Step4;
