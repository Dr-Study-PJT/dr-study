import { GET } from '@/app/api/routeModule';
import { IConference } from '@/app/group/[group_id]/dummy';
import Icon from '@/components/atoms/Icon/Icon';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Tooltip from './Tooltip';
import { fetchConferenceList } from '@/app/group/_components/SectionContents';
import { ToastContainer } from 'react-toastify';
import { showToast } from '@/utils/toastUtil';

interface Group {
    id: number;
    name: string;
    imageUrl: string;
    createdAt: string;
    isDeleted: boolean;
    description: string;
    tags: string[];
    dueDate: string;
    captainId: number;
    memberCount: number;
    memberCapacity: number;
}

interface SidebarTooltipItemProps {
    id: number;
    imageUrl: string;
    title: string;
    isActive: boolean;
    onClick: () => void;
    isLive?: boolean;
}

const SidebarTooltipItem: React.FC<SidebarTooltipItemProps> = ({
    imageUrl,
    title,
    isActive,
    onClick,
    isLive = false,
}) => {
    return (
        <div
            className={`BUTTON-ITEM relative cursor-pointer w-full flex items-center ${
                isActive ? 'active' : ''
            }`}
            onClick={onClick}
        >
            <div
                className={`FOCUS-MARK absolute left-0 w-[9%] h-[20%] rounded-r-full bg-dr-white opacity-0 ${
                    isActive
                        ? 'bg-dr-white h-[70%] opacity-100'
                        : 'h-[0%] hover:bg-dr-white opacity-0 group-hover:opacity-0 transition-all duration-400'
                }`}
            ></div>
            <Tooltip text={title}>
                <div className="relative flex-shrink-0 p-[6px] ml-[3px] w-full h-[3rem] flex items-center justify-center">
                    <div className="relative w-[2.3rem] h-[2.3rem] animate-popIn ">
                        <Image
                            className="rounded-[2rem] hover:rounded-[0.7rem] transition-all duration-300 bg-dr-coral-50 hover:bg-dr-coral-100 "
                            src={imageUrl}
                            alt={`${title} Image`}
                            layout="fill"
                            objectFit="cover"
                        />
                        {isLive && (
                            <div className="CHIP-LIVE absolute bottom-[0.2rem] right-[0.4rem] transform translate-x-1/4 translate-y-1/4 flex items-center border-[0.1rem] border-dr-white bg-black rounded-full py-[0.03rem] pl-[0.2rem] pr-[0.3rem]">
                                <div className="h-[0.35rem] w-[0.35rem] bg-[#FF0000] rounded-full mr-[0.1rem] animate-pulse" />
                                <span className="text-white text-[0.4rem] font-bold">
                                    LIVE
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Tooltip>
        </div>
    );
};

const getMyGroups = async () => {
    let response = null;
    try {
        const res = await GET('v1/groups/my-groups', {
            isAuth: true,
            revalidateTime: 0,
        });
        response = res.data;
    } catch (error) {
        console.error(error);
    }
    return response;
};

// 사이드바 컴포넌트
const SideBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [groups, setGroups] = useState<Group[]>([]);
    const [conferences, setConferences] = useState<IConference[]>([]);
    const memberData = useSelector((state: RootState) => state.member);

    useEffect(() => {
        const fetchData = async () => {
            const myGroups = await getMyGroups();
            console.log('내 그룹:', myGroups);
            setGroups(myGroups);

            if (memberData.id) {
                const fetchedConferences = await fetchConferenceList({
                    memberId: memberData.id,
                    isOpened: true,
                    isClose: false,
                });
                console.log('fetchedConferences:', fetchedConferences);
                setConferences(fetchedConferences);
            }
        };

        fetchData(); // 초기 데이터 로드

        const intervalId = setInterval(fetchData, 10000); // 10초마다 데이터 갱신

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
    }, [memberData]);

    return (
        <div className="SIDEBAR-BOX fixed z-10 left-0 pt-12 pb-8 flex flex-col items-center justify-between w-[3rem] h-[calc(100dvh-1.4rem)] bg-dr-indigo-300 border-r-[1px] border-dr-indigo-100">
            <div className="flex flex-col gap-3">
                <div className="LIST-BUTTON-CONFERENCE flex flex-col gap-3">
                    <div className="text-dr-body-4 cursor-default text-dr-gray-300 w-full text-center font-semibold pl-1 mt-1 animate-popIn">
                        실시간
                    </div>
                    {conferences?.map((conference) => {
                        const isActive =
                            pathname === `/conference/${conference?.id}`;
                        return (
                            <SidebarTooltipItem
                                key={conference.id}
                                id={conference.id}
                                imageUrl={conference.imageUrl}
                                title={conference.title || 'Conference'}
                                isActive={isActive}
                                onClick={() =>
                                    router.push(
                                        `/conference/${conference.id}/waiting-room`,
                                    )
                                }
                                isLive={true}
                            />
                        );
                    })}
                </div>
                {conferences && (
                    <div className="VERTICAL-DIVIDER h-[3px] bg-[#424549] rounded w-[70%] self-center ml-1"></div>
                )}
                <div className="LIST-BUTTON-GROUP flex flex-col gap-3">
                    <div className="text-dr-body-4 cursor-default text-dr-gray-300 w-full text-center font-semibold pl-1 mt-1 animate-popIn">
                        내 그룹
                    </div>
                    {groups?.map((group) => {
                        const isActive = pathname === `/group/${group.id}`;
                        return (
                            <SidebarTooltipItem
                                key={group.id}
                                id={group.id}
                                imageUrl={group.imageUrl}
                                title={group.name}
                                isActive={isActive}
                                onClick={() =>
                                    router.push(`/group/${group.id}`)
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
