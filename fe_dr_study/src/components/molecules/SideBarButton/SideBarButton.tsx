import React from 'react';
import { SideBarButtonProps } from './SideBarButton.types';
import { sideBarButtonStyles } from './SideBarButton.styles';
import Image from 'next/image';
import Live from '@/components/atoms/Live/Live';

export const SideBarButton = ({
    src = '/samsung.png',
    live,
    classNameStyles,
}: SideBarButtonProps) => {
    return (
        <div className={`${sideBarButtonStyles({})} ${classNameStyles}`}>
            <Image
                className="rounded-full"
                src={src}
                alt="Side Bar Button"
                width={92}
                height={92}
            />

            {live && <Live />}
            {live && (
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-[17px]" />
            )}
        </div>
    );
};
