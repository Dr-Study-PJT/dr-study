'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Label } from '@/components/atoms';
import { SectionContents } from '../_components/SectionContents';
import GroupApplyButton from '../_components/GroupApplyButton';
import {
    fetchGroupWithMembersData,
    getGroupMembers,
    GroupMember,
} from './_api/ssr';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { RootState } from '@/store';
import { GroupWithMembersData, Member } from './_types';
import { formatDate, getDateTimePart } from '@/utils/date';

interface IMemberInfo {
    id: number;
    email: string;
    nickname: string;
    regDate: string;
    isLeaved: boolean;
    leavedDate: string;
    imageUrl: string;
}

export default function GroupDetailPage({
    params,
}: {
    params: { group_id: string };
}) {
    const groupId = params.group_id;

    const [groupWithMembers, setGroupWithMembers] =
        useState<GroupWithMembersData>();
    const [membersInThisGroup, setMembersInThisGroup] =
        useState<GroupMember[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [memberData, setMemberData] = useState<IMemberInfo | null>(
        getSessionStorageItem('memberData'),
    );

    const memberRedux = useSelector((state: RootState) => state.member);

    useEffect(() => {
        async function fetchData() {
            console.log('groupId: ', groupId);
            try {
                const groupData = await fetchGroupWithMembersData(groupId);
                const membersData = await getGroupMembers(groupId);
                setGroupWithMembers(groupData);
                setMembersInThisGroup(membersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [groupId]);

    useEffect(() => {
        console.log('groupWithMembers: ', groupWithMembers);
        console.log('membersInThisGroup: ', membersInThisGroup);
    }, [groupWithMembers, membersInThisGroup]);

    useEffect(() => {
        setMemberData(getSessionStorageItem('memberData'));
    }, [memberRedux]);

    const myMemberData = membersInThisGroup?.find(
        (member: GroupMember) => member.memberInfo.id === memberData?.id,
    );

    const isLeader = myMemberData?.role === 'CAPTAIN' ?? false;
    const isMember = !!myMemberData;

    console.log('memberData => ', memberData);
    console.log('isMember => ', isMember);
    console.log('isLeader => ', isLeader);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full bg-dr-indigo-200 flex flex-col h-max">
            <div className="SECTION-THUMBNAIL w-full h-max flex flex-row bg-dr-dark-300 rounded-l-xl">
                <div className="LEFT-IMAGE-THUMBNAIL w-1/3 h-[50vh] rounded-l-xl bg-red-200 relative overflow-hidden">
                    {groupWithMembers?.imageUrl ? (
                        <Image
                            alt="avatar"
                            src={groupWithMembers.imageUrl}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <Image
                            alt="avatar"
                            src="/path/to/fallback-image.png"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    )}
                </div>
                <div className="RIGHT-INFO-GROUP flex flex-col px-10 py-6 w-2/3 h-auto">
                    <div className="w-full h-full flex flex-col justify-between">
                        <div className="TOP-INFO-GROUP w-full h-1/2 flex flex-row justify-between">
                            <div className="TL-LIST-INFO-BASE flex flex-col gap-1 w-max h-full max-w-[33%]">
                                <div className="INFO-TITLE text-dr-header-3 text-dr-white font-bold">
                                    {groupWithMembers?.name}
                                </div>
                                <div className="flex flex-col">
                                    <div className="INFO-DUE-DATE text-dr-body-4 text-dr-gray-300 flex flex-row gap-8">
                                        {`시작일: ${getDateTimePart(formatDate(groupWithMembers?.createdAt), 'date')}`}
                                    </div>
                                    <div className="INFO-DUE-DATE text-dr-body-4 text-dr-gray-300">
                                        {`목표 종료일: ${getDateTimePart(formatDate(groupWithMembers?.dueDate), 'date')}`}
                                    </div>
                                </div>
                                <div className="INFO-DESCRIPTION text-dr-body-4 text-dr-gray-300 mt-3">
                                    {groupWithMembers?.description}
                                </div>
                            </div>
                            <div className="TR-BUTTON">
                                <div
                                    className={`${!isMember ? 'block' : 'hidden'} animate-popIn`}
                                >
                                    <GroupApplyButton groupId={groupId} />
                                </div>
                            </div>
                        </div>
                        <div className="BOTTOM-INFO-GROUP w-full h-max flex flex-row justify-between items-end">
                            <div className="BL-INFO-MEMBER-LIST flex flex-col gap-1">
                                <Label
                                    htmlFor=""
                                    className="font-semibold !text-dr-body-3"
                                >
                                    스터디원 목록
                                </Label>
                                <div className="text-dr-body-4 text-dr-gray-300">
                                    {groupWithMembers?.members.length &&
                                        groupWithMembers?.members.length + ' /'}
                                    {' ' + groupWithMembers?.memberCapacity}
                                </div>
                                <ul className="LIST-MEMBER-IMAGES flex flex-row gap-1">
                                    {membersInThisGroup
                                        ?.slice(0, 3)
                                        .map(
                                            (
                                                member: GroupMember,
                                                i: number,
                                            ) => (
                                                <li key={i}>
                                                    <div className="relative overflow-hidden w-10 h-10 rounded-xl">
                                                        {member.memberInfo
                                                            .imageUrl ? (
                                                            <Image
                                                                id={member.memberInfo.id.toString()}
                                                                alt="avatar"
                                                                src={
                                                                    member
                                                                        .memberInfo
                                                                        .imageUrl
                                                                }
                                                                unoptimized
                                                                fill
                                                                style={{
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />
                                                        ) : (
                                                            <Image
                                                                id={member.memberInfo.id.toString()}
                                                                alt="avatar"
                                                                src="/path/to/fallback-image.png"
                                                                unoptimized
                                                                fill
                                                                style={{
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </li>
                                            ),
                                        )}
                                    {(groupWithMembers?.members
                                        .length as number) > 3 && (
                                        <li key="extra">
                                            <button className="relative overflow-hidden w-10 h-10 rounded-xl border-[1px] border-dr-coral-100 bg-dr-coral-200 hover:bg-dr-coral-100 transition-colors duration-200 flex items-center justify-center">
                                                <span className="text-white font-semibold text-dr-body-3">
                                                    +
                                                    {(groupWithMembers?.members
                                                        .length as number) - 3}
                                                </span>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="BR-BOTTONS flex flex-row justify-between gap-3">
                                <div
                                    className={`${
                                        isLeader ? 'block' : 'hidden'
                                    } flex flex-row justify-between gap-3`}
                                >
                                    <Button color="dark">그룹 관리</Button>
                                    <Button color="dark">팀원 관리</Button>
                                </div>
                                <Button
                                    color="gray"
                                    classNameStyles={
                                        isMember ? 'block' : 'hidden'
                                    }
                                >
                                    탈퇴
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SectionContents
                groupId={groupId}
                isLeader={isLeader}
                isMember={isMember}
            />
        </div>
    );
}
