import { GET } from '@/app/api/routeModule';
import { IConference } from '@/app/group/[group_id]/dummy';
import Icon from '@/components/atoms/Icon/Icon';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Tooltip from './Tooltip';

// 그룹 인터페이스 정의
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

// 내 그룹 정보 가져오기
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

// 컨퍼런스 정보 가져오기
const fetchConferences = async ({
    memberId,
    lowerBoundDate,
    upperBoundDate,
}: {
    memberId: number;
    lowerBoundDate: string;
    upperBoundDate: string;
}) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/v1/conferences?memberId=${memberId}&lowerBoundDate=${lowerBoundDate}&upperBoundDate=${upperBoundDate}`,
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data.data;
    } catch (error) {
        console.error('Error fetching conferences:', error);
    }
};

// 사이드바 컴포넌트
const SideBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [groups, setGroups] = useState<Group[]>([]);
    const [conferences, setConferences] = useState<IConference[]>([]);
    const memberData = useSelector((state: RootState) => state.member);

    useEffect(() => {
        const fetchMyGroups = async () => {
            const myGroups = await getMyGroups();
            console.log('내 그룹:');
            console.log(myGroups);
            setGroups(myGroups);
        };

        fetchMyGroups();

        const loadConferences = async () => {
            if (!memberData.id) {
                setConferences([]);
                return;
            }
            const memberId = memberData?.id;
            if (!memberId) return;
            console.log(memberData);
            const now = new Date();
            const lowerBoundDate = new Date(now.setDate(now.getDate() - 1))
                .toISOString()
                .slice(0, 19);
            const upperBoundDate = new Date().toISOString().slice(0, 19);
            const fetchedConferences = await fetchConferences({
                memberId,
                lowerBoundDate,
                upperBoundDate,
            });
            setConferences(fetchedConferences);
        };

        loadConferences();
    }, [memberData]);

    return (
        <div className="SIDEBAR-BOX fixed z-10 left-0 pt-20 pb-8 flex flex-col items-center justify-between w-[3rem] h-[calc(100dvh-1.4rem)] bg-[#282B30]">
            <div className="flex flex-col gap-3">
                <div className="LIST-BUTTON-CONFERENCE flex flex-col gap-3">
                    {conferences?.map((conference) => {
                        const isActive =
                            pathname === `/conference/${conference?.id}`;
                        return (
                            <div
                                key={conference?.id}
                                className={`BUTTON-CONFERENCE relative cursor-pointer w-full flex items-center ${
                                    isActive ? 'active' : ''
                                }`}
                                onClick={() =>
                                    router.push(`/conference/${conference?.id}`)
                                }
                            >
                                <div
                                    className={`FOCUS-MARK absolute left-0 w-[9%] h-[20%] rounded-r-full bg-dr-white opacity-0 ${
                                        isActive
                                            ? 'bg-dr-white h-[70%] opacity-100'
                                            : 'h-[0%] hover:bg-dr-white opacity-0 group-hover:opacity-0 transition-all duration-500'
                                    }`}
                                ></div>
                                <Tooltip
                                    text={conference?.title || 'Conference'}
                                >
                                    <div className="relative flex-shrink-0 p-[6px] ml-[3px] w-full h-[3rem] flex items-center justify-center">
                                        <div className="relative w-[2.3rem] h-[2.3rem] animate-popIn">
                                            <Image
                                                className="rounded-[10rem] hover:rounded-[0.7rem] transition-all duration-300"
                                                src={conference?.imageUrl}
                                                alt="Conference Image"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                            <div className="CHIP-LIVE absolute bottom-[0.2rem] right-[0.4rem] transform translate-x-1/4 translate-y-1/4 flex items-center border-[0.1rem] border-dr-white bg-black rounded-full py-[0.03rem] pl-[0.2rem] pr-[0.3rem]">
                                                <div className="h-[0.35rem] w-[0.35rem] bg-[#FF0000] rounded-full mr-[0.1rem] animate-pulse" />
                                                <span className="text-white text-[0.4rem] font-bold">
                                                    LIVE
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                        );
                    })}
                </div>
                {conferences && (
                    <div className="VERTICAL-DIVIDER h-[3px] bg-[#424549] rounded w-[70%] self-center ml-1"></div>
                )}
                <div className="LIST-BUTTON-GROUP flex flex-col gap-3">
                    {groups?.map((group) => {
                        const isActive = pathname === `/group/${group.id}`;
                        return (
                            <div
                                key={group.id}
                                className={`BUTTON-GROUP relative cursor-pointer w-full flex items-center ${
                                    isActive ? 'active' : ''
                                }`}
                                onClick={() =>
                                    router.push(`/group/${group.id}`)
                                }
                            >
                                <div
                                    className={`FOCUS-MARK absolute left-0 w-[9%] h-[20%] rounded-r-full bg-dr-white opacity-0 ${
                                        isActive
                                            ? 'bg-dr-white h-[70%] opacity-100'
                                            : 'h-[0%] hover:bg-dr-white opacity-0 group-hover:opacity-0 transition-all duration-500'
                                    }`}
                                ></div>
                                <Tooltip text={group.name}>
                                    <div className="relative flex-shrink-0 p-[6px] ml-[3px] w-full h-[3rem] flex items-center justify-center">
                                        <div className="relative w-[2.3rem] h-[2.3rem] animate-popIn">
                                            <Image
                                                className="rounded-[10rem] hover:rounded-[0.7rem] transition-all duration-300"
                                                src={group.imageUrl}
                                                alt="Group Image"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>
                        );
                    })}
                </div>
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
