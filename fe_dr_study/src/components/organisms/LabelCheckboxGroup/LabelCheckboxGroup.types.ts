import { LabelCheckboxProps } from '@/components/molecules/LabelCheckbox/LabelCheckbox.types';

export interface LabelCheckboxGroupProps {
    groupName: string;
    options: LabelCheckboxProps[];
    value: string;
    onChange: (value: string) => void;
}
