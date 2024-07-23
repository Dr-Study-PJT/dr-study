import Icon from '@/components/atoms/Icon/Icon';
import { SideBarButton } from '@/components/molecules/SideBarButton/SideBarButton';
import React from 'react';

const SideBar = () => {
    return (
        <div className="fixed py-12 px-3 flex flex-col items-center justify-between w-[7.5rem] h-[calc(100dvh-5.8125rem)] bg-[#282B30]">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <SideBarButton src="/samsung.png" live />
                    <SideBarButton src="/samsung.png" live />
                </div>
                <div className="h-2 bg-[#424549] rounded"></div>
                <div className="flex flex-col gap-5">
                    <SideBarButton src="/samsung.png" />
                    <SideBarButton src="/samsung.png" />
                    <SideBarButton src="/samsung.png" />
                </div>
                <div className="mb-5 h-2 bg-[#424549] rounded"></div>
            </div>
            <div>
                <Icon
                    icon="gear"
                    text="gray"
                    bg="gray"
                    size="lg"
                    cursor="pointer"
                />
            </div>
        </div>
    );
};

export default SideBar;
