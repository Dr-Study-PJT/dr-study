import {
    TextareaProps,
    TextareaSize,
} from '@/components/atoms/Textarea/Textarea.types';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface TextareaWithLabelProps extends TextareaProps {
    label: string;
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    textareaClassName?: string;
    labelClassName?: string;
    textareaSize?: TextareaSize;
    fullWidth?: boolean;
}
