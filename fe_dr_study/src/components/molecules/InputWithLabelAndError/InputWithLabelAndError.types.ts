import { InputProps, InputSize } from '@/components/atoms/Input/Input.types';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface InputWithLabelAndErrorProps extends InputProps {
    label: string;
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    inputClassName?: string;
    labelClassName?: string;
    inputSize?: InputSize;
    fullWidth?: boolean;
}
