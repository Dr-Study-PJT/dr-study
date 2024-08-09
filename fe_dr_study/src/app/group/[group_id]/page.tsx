// src/app/group/new/GroupDetailPage.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Button, Label } from '@/components/atoms';
import { Textarea } from '@/components/atoms/Textarea';
import { SectionContents } from '../_components/SectionContents';
import GroupApplyButton from '../_components/GroupApplyButton';
import { fetchGroupWithMembersData, getGroupMembers } from './_api/ssr';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { RootState } from '@/store';
import { GroupWithMembersData } from './_types';
import { GroupMember } from './_api/ssr';
import { formatDate, getDateTimePart } from '@/utils/date';
import { useRouter } from 'next/navigation';
import MemberList from './_components/MemberList';

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
    const [memberData, setMemberData] = useState(
        getSessionStorageItem('memberData'),
    );
    const [isEditing, setIsEditing] = useState(false);
    const [editedGroup, setEditedGroup] = useState<
        Partial<GroupWithMembersData>
    >({});

    const memberRedux = useSelector((state: RootState) => state.member);

    useEffect(() => {
        async function fetchData() {
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
        setMemberData(getSessionStorageItem('memberData'));
    }, [memberRedux]);

    const myMemberData = membersInThisGroup?.find(
        (member: GroupMember) => member.memberInfo.id === memberData?.id,
    );

    const router = useRouter();

    const isLeader = myMemberData?.role === 'CAPTAIN' ?? false;
    const isMember = !!myMemberData;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleEditClick = () => {
        setEditedGroup({
            name: groupWithMembers?.name,
            description: groupWithMembers?.description,
            memberCapacity: groupWithMembers?.memberCapacity,
        });
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedGroup({});
    };

    const handleSaveClick = async () => {
        try {
            // await updateGroupData(groupId, editedGroup);
            // setGroupWithMembers((prev) => ({
            //     ...prev,
            //     ...editedGroup,
            // }));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating group:', error);
        }
    };

    const handleDeleteClick = async () => {
        try {
            // await deleteGroup(groupId);
            router.push('/groups'); // 삭제 후 그룹 목록 페이지로 이동
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    return (
        <div className="w-full bg-dr-indigo-200 flex flex-col h-max">
            <div className="SECTION-THUMBNAIL w-full h-max flex flex-row bg-dr-indigo-400 rounded-l-xl">
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
                                {isEditing ? (
                                    <>
                                        <Textarea
                                            value={
                                                editedGroup.description || ''
                                            }
                                            onChange={(e) =>
                                                setEditedGroup({
                                                    ...editedGroup,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="text-dr-body-4 text-dr-gray-300 mt-3"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className="INFO-TITLE text-dr-header-3 text-dr-white font-bold">
                                            {groupWithMembers?.name}
                                        </div>
                                        <div className="INFO-DUE-DATE text-dr-body-4 text-dr-gray-300 flex flex-row gap-8">
                                            {`시작일: ${getDateTimePart(
                                                formatDate(
                                                    groupWithMembers?.createdAt,
                                                ),
                                                'date',
                                            )}`}
                                        </div>
                                        <div className="INFO-DUE-DATE text-dr-body-4 text-dr-gray-300">
                                            {`목표 종료일: ${getDateTimePart(
                                                formatDate(
                                                    groupWithMembers?.dueDate,
                                                ),
                                                'date',
                                            )}`}
                                        </div>
                                        <div className="INFO-DESCRIPTION text-dr-body-4 text-dr-gray-300 mt-3">
                                            {groupWithMembers?.description}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="TR-BUTTON">
                                <div
                                    className={`${
                                        !isMember ? 'block' : 'hidden'
                                    } animate-popIn`}
                                >
                                    <GroupApplyButton groupId={groupId} />
                                </div>
                            </div>
                        </div>
                        <div className="BOTTOM-INFO-GROUP w-full h-max flex flex-row justify-between items-end">
                            <MemberList
                                members={membersInThisGroup ?? []}
                                memberCapacity={
                                    groupWithMembers?.memberCapacity ?? 0
                                }
                            />
                            <div className="BR-BOTTONS flex flex-row justify-between gap-3">
                                {isLeader && (
                                    <>
                                        {isEditing ? (
                                            <>
                                                <Button
                                                    classNameStyles="animate-popIn"
                                                    color="coral"
                                                    onClick={handleSaveClick}
                                                >
                                                    수정
                                                </Button>
                                                <Button
                                                    classNameStyles="animate-popIn"
                                                    color="red"
                                                    onClick={handleDeleteClick}
                                                >
                                                    삭제
                                                </Button>
                                                <Button
                                                    classNameStyles="animate-popIn"
                                                    color="dark"
                                                    onClick={handleCancelClick}
                                                >
                                                    취소
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                classNameStyles="animate-popIn"
                                                color="dark"
                                                onClick={handleEditClick}
                                            >
                                                그룹 관리
                                            </Button>
                                        )}
                                    </>
                                )}
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
