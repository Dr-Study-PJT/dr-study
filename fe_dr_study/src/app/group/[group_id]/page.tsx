'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Button } from '@/components/atoms';
import { Textarea } from '@/components/atoms/Textarea';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { SectionContents } from '../_components/SectionContents';
import GroupApplyButton from '../_components/GroupApplyButton';
import { fetchGroupWithMembersData, getGroupMembers } from './_api/ssr';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { RootState } from '@/store';
import { GroupWithMembersData } from './_types';
import { GroupMember } from './_api/ssr';
import { useRouter } from 'next/navigation';
import MemberList from './_components/MemberList';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DELETE, PATCH } from '@/app/api/routeModule';
import { groupAPI } from '@/app/api/axiosInstanceManager';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import { formatDate, getDateTimePart } from '@/utils/date';
import { showToast } from '@/utils/toastUtil';

export default function GroupDetailPage({
    params,
    searchParams,
}: {
    params: { group_id: string };
    searchParams: { error: string };
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
        Partial<GroupWithMembersData> & { imageId?: number }
    >({});

    const memberRedux = useSelector((state: RootState) => state.member);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const fetchData = async () => {
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
    };

    useEffect(() => {
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

    const handleEditClick = () => {
        setEditedGroup({
            name: groupWithMembers?.name,
            description: groupWithMembers?.description,
            imageUrl: groupWithMembers?.imageUrl,
        });
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedGroup({});
    };

    const handleSaveClick = async () => {
        try {
            const { name, description, imageId } = editedGroup;
            const body = {
                name,
                description,
                imageId,
                captainId: memberData?.id, // captainId를 수정자 본인의 ID로 설정
            };

            await PATCH({
                API: groupAPI,
                endPoint: groupId,
                isAuth: true,
                body: body,
            });

            showToast('success', '그룹 정보 수정 성공!');

            setIsEditing(false);

            // 수정 후 데이터 재요청하여 최신 데이터로 업데이트
            await fetchData();
        } catch (error) {
            console.error('Error updating group:', error);
            showToast('error', '그룹 정보 수정 실패');
        }
    };

    const handleDeleteClick = async () => {
        try {
            // 그룹 삭제 로직 추가 필요
            const response = await DELETE({
                API: groupAPI,
                endPoint: groupId,
                isAuth: true,
            });
            showToast('success', '그룹 삭제 성공!');

            router.push('/group/list');
        } catch (error) {
            console.error('Error deleting group:', error);
            showToast('error', '그룹 삭제 실패!');
        }
    };

    const handleLeaveGroupClick = async () => {
        try {
            // 그룹 탈퇴(소프트 삭제) 요청
            const response = await DELETE({
                API: groupAPI,
                endPoint: `member/${groupId}`, // 경로에 groupId를 포함하여 요청
                isAuth: true,
            });

            showToast('success', '그룹에서 성공적으로 탈퇴했습니다.');

            // 탈퇴 후 그룹 목록 페이지로 이동
            router.push('/group/list');
        } catch (error) {
            console.error('Error leaving group:', error);
            showToast('error', '그룹 탈퇴에 실패했습니다.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedGroup({ ...editedGroup, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('domain', 'groups');

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_HOST}/v1/media`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );

                const { imageId } = response.data.data;
                const imageUrl = URL.createObjectURL(file);

                setEditedGroup({
                    ...editedGroup,
                    imageUrl,
                    imageId,
                });

                toast.success('이미지가 성공적으로 업로드되었습니다.');
            } catch (error) {
                console.error('Image upload failed:', error);
                toast.error('이미지 업로드에 실패했습니다.');
            }
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full bg-dr-indigo-200 flex flex-col h-max">
            <ToastContainer position="bottom-right" />
            <div className="SECTION-THUMBNAIL w-full h-max flex flex-row bg-dr-indigo-400 rounded-l-xl">
                <div
                    className="LEFT-IMAGE-THUMBNAIL w-1/3 h-[50vh] rounded-l-xl bg-gradient-to-r from-dr-coral-200 to-dr-indigo-400 relative overflow-hidden cursor-pointer"
                    onClick={isEditing ? triggerFileInput : undefined}
                >
                    {isEditing && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={fileInputRef}
                            className="hidden"
                        />
                    )}
                    {editedGroup.imageUrl ? (
                        <Image
                            alt="thumbnail"
                            src={editedGroup.imageUrl}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    ) : groupWithMembers?.imageUrl ? (
                        <Image
                            alt="thumbnail"
                            src={groupWithMembers.imageUrl}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <Image
                            alt="thumbnail"
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
                                        <InputWithLabelAndError
                                            id="group-name"
                                            name="name"
                                            label="그룹 이름"
                                            value={editedGroup.name || ''}
                                            onChange={handleInputChange}
                                            className="text-dr-header-3 text-dr-white font-bold"
                                        />
                                        <TextareaWithLabel
                                            label="스터디 설명"
                                            value={
                                                editedGroup.description || ''
                                            }
                                            onChange={(e) =>
                                                setEditedGroup({
                                                    ...editedGroup,
                                                    description: e.target.value,
                                                })
                                            }
                                            textareaSize="md"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className="INFO-TITLE text-dr-header-3 text-dr-white font-bold">
                                            {groupWithMembers?.name}
                                        </div>
                                        <div className="INFO-DUE-DATE text-dr-body-4 text-dr-dark-100 flex flex-row gap-8">
                                            {`시작일: ${getDateTimePart(
                                                formatDate(
                                                    groupWithMembers?.createdAt,
                                                ),
                                                'date',
                                            )}`}
                                        </div>
                                        <div className="INFO-DUE-DATE text-dr-body-4 text-dr-dark-100">
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
                                    onClick={handleLeaveGroupClick}
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
