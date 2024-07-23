import React from 'react';

import { pageContainerStyles } from './PageContainer.styles';
import { PageContainerProps } from './PageContainer.types';

export const PageContainer = ({
    variant,
    bg,
    className,
    children,
}: PageContainerProps) => {
    return (
        <div className={`${pageContainerStyles({ variant, bg })} ${className}`}>
            {children}
        </div>
    );
};
