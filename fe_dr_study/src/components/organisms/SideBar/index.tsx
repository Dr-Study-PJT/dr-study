import { GET } from '@/app/api/routeModule';
import { IConference } from '@/app/group/[group_id]/dummy';
import Icon from '@/components/atoms/Icon/Icon';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const dummyConferenceListData: IConference[] = [
    {
        id: 1,
        hostId: 1,
        studyGroupId: 1,
        title: '첫 번째 더미 컨퍼런스',
        memberCapacity: 10,
        startTime: '2024-08-05T18:42:17.377Z',
        finishTime: null,
        imageUrl: 'https://via.placeholder.com/150',
        participants: [
            {
                id: 1,
                email: 'test1@example.com',
                nickname: '참가자1',
                imageUrl: 'https://via.placeholder.com/100',
                regDate: '2024-08-05T07:06:05.361Z',
                leavedDate: null,
                leaved: false,
            },
        ],
    },
    {
        id: 2,
        hostId: 2,
        studyGroupId: 2,
        title: '두 번째 더미 컨퍼런스',
        memberCapacity: 15,
        startTime: '2024-08-06T10:30:00.000Z',
        finishTime: null,
        imageUrl: 'https://via.placeholder.com/150',
        participants: [
            {
                id: 2,
                email: 'test2@example.com',
                nickname: '참가자2',
                imageUrl: 'https://via.placeholder.com/100',
                regDate: '2024-08-06T08:00:00.000Z',
                leavedDate: null,
                leaved: false,
            },
        ],
    },
];

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

const dummyMyGroupListData: Group[] = [
    {
        id: 1,
        name: '정처기 스터디',
        imageUrl: 'https://via.placeholder.com/150',
        createdAt: '2024-08-05T19:14:23.592Z',
        isDeleted: false,
        description: '정처기 합격을 위한 스터디입니다.',
        tags: ['#정처기', '#스터디'],
        dueDate: '2024-08-16',
        captainId: 1,
        memberCount: 1,
        memberCapacity: 6,
    },
    {
        id: 2,
        name: '모의면접 스터디',
        imageUrl: 'https://via.placeholder.com/150',
        createdAt: '2024-08-05T19:14:23.592Z',
        isDeleted: false,
        description: '모의면접 준비를 위한 스터디입니다.',
        tags: ['#모의면접', '#취업'],
        dueDate: '2024-08-20',
        captainId: 2,
        memberCount: 3,
        memberCapacity: 5,
    },
];

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

const fetchConferences = async ({
    memberId,
    lowerBoundDate,
    upperBoundDate,
}: {
    memberId: string;
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
        // return dummyConferenceListData; // 실패 시 더미 데이터 사용
    }
};

const SideBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [groups, setGroups] = useState<Group[]>([]);
    const [conferences, setConferences] = useState<IConference[]>([]);

    useEffect(() => {
        const fetchMyGroups = async () => {
            const myGroups = await getMyGroups();
            console.log('내 그룹:');
            console.log(myGroups);
            setGroups(myGroups);
        };

        fetchMyGroups();

        const loadConferences = async () => {
            const memberData = getSessionStorageItem('memberData');
            const memberId = memberData?.id;
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
    }, []);

    return (
        <div className="SIDEBAR-BOX fixed z-10 left-0 pt-20 pb-8 flex flex-col items-center justify-between w-[3rem] h-[calc(100dvh-1.4rem)] bg-[#282B30]">
            <div className="flex flex-col gap-3">
                <div className="LIST-BUTTON-CONFERENCE flex flex-col gap-3">
                    {conferences?.map((conference) => {
                        const isActive =
                            pathname === `/conference/${conference.id}`;
                        return (
                            <div
                                key={conference.id}
                                className={`BUTTON-CONFERENCE relative cursor-pointer w-full flex items-center ${
                                    isActive ? 'active' : ''
                                }`}
                                onClick={() =>
                                    router.push(`/conference/${conference.id}`)
                                }
                            >
                                <div
                                    className={`FOCUS-MARK absolute left-0 w-[9%] h-[20%] rounded-r-full bg-dr-white opacity-0 ${
                                        isActive
                                            ? 'bg-dr-white h-[70%] opacity-100'
                                            : 'h-[0%] hover:bg-dr-white opacity-0 group-hover:opacity-0 transition-all duration-500'
                                    }`}
                                ></div>
                                <div className="relative flex-shrink-0 p-[6px] ml-[3px] w-full h-[3rem] flex items-center justify-center">
                                    <div className="relative w-[2.3rem] h-[2.3rem]">
                                        <Image
                                            className="rounded-[10rem] hover:rounded-[0.7rem] transition-all duration-300"
                                            src={conference.imageUrl}
                                            alt="Conference Image"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                        <div className="CHIP-LIVE absolute bottom-[0.2rem] right-[0.4rem] transform translate-x-1/4 translate-y-1/4 flex items-center border-[0.1rem] border-dr-white bg-black rounded-full py-[0.03rem] pl-[0.2rem] pr-[0.3rem]">
                                            <div className="h-[0.35rem] w-[0.35rem] bg-[#FF0000] rounded-full mr-[0.1rem]" />
                                            <span className="text-white text-[0.4rem] font-bold">
                                                LIVE
                                            </span>
                                        </div>
                                    </div>
                                </div>
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
                                <div className="relative flex-shrink-0 p-[6px] ml-[3px] w-full h-[3rem] flex items-center justify-center">
                                    <div className="relative w-[2.3rem] h-[2.3rem]">
                                        <Image
                                            className="rounded-[10rem] hover:rounded-[0.7rem] transition-all duration-300"
                                            src={group.imageUrl}
                                            alt="Group Image"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>
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
