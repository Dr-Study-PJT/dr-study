import { boxStyles } from './Box.styles';

export interface BoxProps {
    variant?: keyof typeof boxStyles.variants.variant;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'black' | 'white';
    className?: string;
    children: React.ReactNode;
}
