import Icon from '@/components/atoms/Icon/Icon';
import { SideBarButton } from '@/components/molecules/SideBarButton/SideBarButton';
import React from 'react';

const SideBar = () => {
    return (
        <div className="fixed left-0 px-[10px] py-4 flex flex-col items-center justify-between w-[3.75rem] h-[calc(100dvh-3.75rem)] bg-[#282B30]">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <SideBarButton src="/samsung.png" live />
                    <SideBarButton src="/samsung.png" live />
                </div>
                <div className="h-1 bg-[#424549] rounded"></div>
                <div className="flex flex-col gap-3">
                    <SideBarButton src="/samsung.png" />
                    <SideBarButton src="/samsung.png" />
                    <SideBarButton src="/samsung.png" />
                </div>
                <div className="mb-5 h-1 bg-[#424549] rounded"></div>
            </div>
            <div>
                <Icon
                    icon="gear"
                    text="gray"
                    bg="gray"
                    size="sm"
                    cursor="pointer"
                />
            </div>
        </div>
    );
};

export default SideBar;
