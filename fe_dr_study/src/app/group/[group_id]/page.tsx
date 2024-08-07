'use client';

import Image from 'next/image';
import { Button, Label } from '@/components/atoms';

import { postGroupAdmissionApply } from './_api/csr';
import { SectionContents } from '../_components/SectionContents';
import GroupApplyButton from '../_components/GroupApplyButton';
import { fetchGroupWithMembersData, getGroupMembers } from './_api/ssr';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { useQuery } from '@tanstack/react-query';
import { login } from '@/app/auth/_api/login';

export default function GroupDetailPage({
    params,
}: {
    params: { group_id: string };
}) {
    const groupId = params.group_id;

    const {
        data: groupWithMembers,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['groupWithMembers', groupId],
        queryFn: () => fetchGroupWithMembersData(groupId),
    });
    const {
        data: membersInThisGroup,
        error: membersInThisGroupError,
        isLoading: membersInThisGroupIsLoading,
    } = useQuery({
        queryKey: ['membersInThisGroup', groupId],
        queryFn: () => getGroupMembers(groupId),
    });

    const { data: memberData } = useQuery({
        queryKey: ['memberData'],
    });

    console.log('memberData => ', memberData);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // // 현재 사용자가 그룹장인지, 멤버인지 확인
    const myMemberData = membersInThisGroup?.find(
        (member) => member.memberInfo.id === 1,
    );
    const isLeader = myMemberData?.role === 'CAPTAIN';
    const isMember = !!myMemberData;

    return (
        <div className="w-full bg-dr-indigo-200 flex flex-col">
            <div className="SECTION-THUMBNAIL w-full h-max flex flex-row bg-dr-dark-300 rounded-l-xl">
                <div className="LEFT-IMAGE-THUMBNAIL w-1/3 h-[50vh] rounded-l-xl bg-red-200 relative overflow-hidden">
                    <Image
                        alt="avatar"
                        src={
                            groupWithMembers?.imageUrl ||
                            '/path/to/fallback-image.png'
                        }
                        fill
                    />
                </div>
                <div className="RIGHT-INFO-GROUP flex flex-col px-10 py-6 w-2/3 h-auto">
                    <div className="w-full h-full flex flex-col justify-between">
                        <div className="TOP-INFO-GROUP w-full h-1/2 flex flex-row justify-between">
                            <div className="TL-LIST-INFO-BASE flex flex-col justify-between gap-3 w-max h-full max-w-[33%]">
                                <div className="INFO-TITLE text-dr-header-3 text-dr-white font-bold">
                                    {groupWithMembers?.name}
                                </div>
                                <div className="INFO-DUE-DATE text-dr-body-4 text-dr-gray-100">{`${groupWithMembers?.createdAt} ~ ${groupWithMembers?.dueDate} | 1일째 진행 중`}</div>
                                <div className="INFO-DESCRIPTION text-dr-body-4 text-dr-gray-100">
                                    {groupWithMembers?.description}
                                </div>
                            </div>
                            <div className="TR-BUTTON">
                                {isMember ? (
                                    <>
                                        {isLeader && (
                                            <>
                                                <Button
                                                    color="dark"
                                                    // onClick={onClickRouteToGroupManage}
                                                >
                                                    그룹 관리
                                                </Button>
                                                <Button
                                                    color="dark"
                                                    // onClick={onClickRouteToMemberManage}
                                                >
                                                    팀원 관리
                                                </Button>
                                            </>
                                        )}
                                        <Button
                                            color="dark"
                                            // onClick={onClickRouteToLeave}
                                        >
                                            탈퇴
                                        </Button>
                                    </>
                                ) : (
                                    <GroupApplyButton groupId={groupId} />
                                )}
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
                                <div className="text-dr-body-4 text-dr-gray-100">
                                    {groupWithMembers?.members.length &&
                                        groupWithMembers?.members.length + ' /'}
                                    {' ' + groupWithMembers?.memberCapacity}
                                </div>
                                <ul className="LIST-MEMBER-IMAGES flex flex-row gap-1">
                                    {groupWithMembers?.members
                                        .slice(0, 3)
                                        .map((memberInfo, i) => (
                                            <li key={i}>
                                                <div className="relative overflow-hidden w-10 h-10 rounded-xl">
                                                    <Image
                                                        alt="avatar"
                                                        src={
                                                            memberInfo?.imageUrl ||
                                                            '/path/to/fallback-image.png'
                                                        }
                                                        unoptimized
                                                        fill
                                                    />
                                                </div>
                                            </li>
                                        ))}
                                    {(groupWithMembers?.members
                                        ?.length as number) > 3 && (
                                        <li key="extra">
                                            <button className="relative overflow-hidden w-10 h-10 rounded-xl border-[1px] border-dr-coral-100 bg-dr-coral-200 hover:bg-dr-coral-100 transition-colors duration-200 flex items-center justify-center">
                                                <span className="text-white font-semibold text-dr-body-3">
                                                    +
                                                    {(groupWithMembers?.members
                                                        ?.length as number) - 3}
                                                </span>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            {/* Additional components if needed */}
                        </div>
                    </div>
                </div>
            </div>
            {/* SectionContents 컴포넌트에 필요한 props 전달 */}
            <SectionContents
                groupId={groupId}
                isLeader={isLeader}
                isMember={isMember}
            />
        </div>
    );
}
