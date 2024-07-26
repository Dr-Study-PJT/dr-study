import { pageContainerStyles } from './PageContainer.styles';

export interface PageContainerProps {
    variant?: keyof typeof pageContainerStyles.variants.variant;
    bg?: keyof typeof pageContainerStyles.variants.bg;
    className?: string;
    children: React.ReactNode;
}
