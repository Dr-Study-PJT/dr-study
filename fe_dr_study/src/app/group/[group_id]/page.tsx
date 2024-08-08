'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Label, Input } from '@/components/atoms';
import { Textarea } from '@/components/atoms/Textarea';
import { SectionContents } from '../_components/SectionContents';
import GroupApplyButton from '../_components/GroupApplyButton';
import {
    fetchGroupWithMembersData,
    getGroupMembers,
    // updateGroupData,
    // deleteGroup,
} from './_api/ssr';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { RootState } from '@/store';
import { GroupWithMembersData } from './_types';
import { GroupMember } from './_api/ssr';
import { formatDate, getDateTimePart } from '@/utils/date';
import Tooltip from '@/components/organisms/SideBar/Tooltip';
import { FaUsers } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

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
    const [isEditing, setIsEditing] = useState(false);
    const [editedGroup, setEditedGroup] = useState<
        Partial<GroupWithMembersData>
    >({});

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

    const router = useRouter();

    const isLeader = myMemberData?.role === 'CAPTAIN' ?? false;
    const isMember = !!myMemberData;

    console.log('memberData => ', memberData);
    console.log('isMember => ', isMember);
    console.log('isLeader => ', isLeader);

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
                                        {/* <Input
                                            value={editedGroup.name || ''}
                                            onChange={(e) =>
                                                setEditedGroup({
                                                    ...editedGroup,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="text-dr-header-3 text-dr-white font-bold"
                                        /> */}
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
                                        {/* <Input
                                            type="number"
                                            value={
                                                editedGroup.memberCapacity || ''
                                            }
                                            onChange={(e) =>
                                                setEditedGroup({
                                                    ...editedGroup,
                                                    memberCapacity: parseInt(
                                                        e.target.value,
                                                        10,
                                                    ),
                                                })
                                            }
                                            className="text-dr-body-4 text-dr-gray-300 mt-3"
                                        /> */}
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
                                <div className="INFO-TAGS flex flex-wrap mt-3">
                                    {groupWithMembers?.tags.map(
                                        (tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-[3px] bg-dr-gray-500 text-dr-body-4 rounded-full text-dr-coral-100 cursor-pointer hover:font-bold transition-all duration-200 mr-2 mb-2"
                                            >
                                                {tag}
                                            </span>
                                        ),
                                    )}
                                </div>
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
                            <div className="BL-INFO-MEMBER-LIST flex flex-col gap-1">
                                <div className="flex flex-row gap-2">
                                    <Label
                                        htmlFor=""
                                        className="font-semibold !text-dr-body-3 !text-dr-gray-100"
                                    >
                                        스터디원 목록
                                    </Label>
                                    <div className="flex flex-row gap-1">
                                        <FaUsers className="text-dr-gray-400 text-dr-body-3 self-center pb-0" />
                                        <div className="text-dr-body-4 text-dr-gray-300 flex flex-row gap-1 items-center">
                                            {groupWithMembers?.members.length &&
                                                groupWithMembers?.members
                                                    .length + ' /'}
                                            {' ' +
                                                groupWithMembers?.memberCapacity}
                                        </div>
                                    </div>
                                </div>
                                <ul className="LIST-MEMBER-IMAGES flex flex-row gap-2">
                                    {membersInThisGroup
                                        ?.slice(0, 3)
                                        .map(
                                            (
                                                member: GroupMember,
                                                i: number,
                                            ) => (
                                                <li key={i}>
                                                    <div
                                                        className="relative overflow-hidden w-[2.3rem] h-[2.3rem] rounded-xl cursor-pointer"
                                                        onClick={(e) => {
                                                            router.push(
                                                                `/members/${member?.memberInfo?.id}`,
                                                            );
                                                        }}
                                                    >
                                                        {member.memberInfo
                                                            .imageUrl ? (
                                                            <Tooltip
                                                                text={
                                                                    member
                                                                        .memberInfo
                                                                        .nickname
                                                                }
                                                                direction="top"
                                                            >
                                                                <div className="relative w-[2.3rem] h-[2.3rem] animate-popIn">
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
                                                                </div>
                                                            </Tooltip>
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
