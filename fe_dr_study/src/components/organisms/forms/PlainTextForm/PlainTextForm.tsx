'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import formConditions from '@/constants/formConditions';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { Button } from '@/components/atoms';

interface Inputs {
    plainText: string;
}

export const PlainTextForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    console.log(errors); // Optional: For debugging purposes to view form errors.

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputWithLabelAndError
                id=""
                {...register('plainText', { ...formConditions.plainText })}
                error={errors.plainText?.message || ''}
                label="스터디 그룹명"
            />
            <Button type="submit">Submit</Button> // Assuming a Button component
            exists.
        </form>
    );
};
