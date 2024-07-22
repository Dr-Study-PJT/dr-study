import { PlainTextFormStyles } from './PlainTextForm.styles';
export interface FormProps {
    variant?: keyof typeof PlainTextFormStyles.variants.variant;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'black' | 'white';
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: keyof typeof PlainTextFormStyles.variants.variant;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'black' | 'white';
}

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: keyof typeof PlainTextFormStyles.variants.variant;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'black' | 'white';
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof PlainTextFormStyles.variants.variant;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'black' | 'white';
}

export interface LabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement> {
    variant?: keyof typeof PlainTextFormStyles.variants.variant;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'black' | 'white';
}

export interface ErrorMessageProps {
    children: React.ReactNode;
    color?: 'danger';
}
