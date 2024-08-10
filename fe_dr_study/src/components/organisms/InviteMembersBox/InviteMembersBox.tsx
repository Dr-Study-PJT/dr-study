import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { POST } from '@/app/api/routeModule';
import { Button } from '@/components/atoms';
import { ConferenceMember } from '@/interfaces/conference';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface InviteMembersBoxProps {
    memberData: any; // any 타입 수정 !필요!
    members: ConferenceMember[]; // 초대할 멤버 목록
    conferenceId?: number; // 회의 ID (선택적)
    setIsMemberInvited: (isMemberInvited: boolean) => void; // 초대 상태를 설정하는 함수
    capacity?: number; // 컨퍼런스 최대 인원 수 (선택적)
}

const InviteMembersBox = ({
    memberData,
    members,
    conferenceId,
    setIsMemberInvited,
    capacity = 16,
}: InviteMembersBoxProps) => {
    const [selectedMembers, setSelectedMembers] = useState<ConferenceMember[]>(
        [],
    ); // 선택된 멤버 상태
    const [isMemberSelected, setIsMemberSelected] = useState<boolean>(false); // 멤버 선택 여부

    // 멤버 초대 핸들러
    const handleAddMember = (member: ConferenceMember) => {
        console.log('member =>', member, '\nmemberData => ', memberData);
        // 이미 선택된 멤버인지 확인
        if (
            selectedMembers.some(
                (currentMember) =>
                    currentMember.memberInfo.id === member?.memberInfo.id,
            )
        ) {
            // 선택된 멤버라면 목록에서 제거
            setSelectedMembers((prev) =>
                prev.filter(
                    (currentMember) =>
                        currentMember.memberInfo.id !== member?.memberInfo.id,
                ),
            );
        } else {
            // 선택되지 않은 멤버라면 목록에 추가
            setSelectedMembers((prev) => [...prev, member]);
        }
    };

    // 선택된 멤버 제거 핸들러
    const handleRemoveMember = (member: ConferenceMember) => {
        setSelectedMembers((prev) =>
            prev.filter((member) => member.memberInfo.id !== memberData?.id),
        ); // 목록에서 제거
    };

    // 초대 요청 핸들러
    const handleInviteConferenceMember = async () => {
        // 선택된 멤버가 없으면 종료
        if (selectedMembers.length === 0) {
            return;
        }

        try {
            // 모든 초대 요청을 Promise 배열로 만들기
            const invitePromises = selectedMembers.map((member) => {
                console.log('초대할 멤버 아이디: ', member?.memberInfo.id);
                return POST({
                    API: API,
                    endPoint: `${conferenceId}/invite`,
                    body: {
                        inviteeId: member?.memberInfo?.id,
                    },
                    isAuth: true,
                });
            });
            // 모든 초대 요청이 완료될 때까지 대기
            const promisesResult = await Promise.all(invitePromises);
            console.log(
                'handleInviteConferenceMember => 초대한 멤버 id 목록:',
                promisesResult,
            );
            setIsMemberInvited(true);
            console.log('setIsMemberInvited => 초대 요청 신호 true 변경');
            // 서버측에서 초대한 멤버들에게 notification 전송하도록 요청 !필요!
        } catch (error) {
            console.error('초대 요청 실패:', error);
        }
    };

    // 선택된 멤버의 수가 0명인 경우 선택 요청 표시가 나타나도록 설정
    useEffect(() => {
        console.log('선택한 멤버 목록 (selectedMembers):', selectedMembers);
        if (selectedMembers.length === 0) {
            setIsMemberSelected(true);
            return;
        } else {
            setIsMemberSelected(false);
        }
    }, [selectedMembers]);

    const maxInviteMemberCount =
        capacity < members?.length ? capacity : members?.length; // 초대할 수 있는 최대 멤버 수

    return (
        <div className="rounded-md">
            <p className="text-dr-header-2">컨퍼런스 멤버 초대하기</p>
            <div>
                <p className="py-[0.5rem] text-dr-body-3 text-dr-gray-100">
                    스터디 그룹 멤버 목록
                </p>
                <div className="flex flex-wrap gap-2">
                    {members?.map((member) => (
                        <div
                            className={`bg-dr-indigo-100 p-[1rem] w-[7rem] h-[7rem] duration-200 hover:bg-dr-indigo-0 cursor-pointer flex flex-col items-center gap-1 rounded-md ${
                                selectedMembers.some(
                                    (currentMember) =>
                                        currentMember.memberInfo.id ===
                                        member?.memberInfo.id,
                                )
                                    ? 'border border-blue-500'
                                    : ''
                            }`}
                            key={member.memberInfo?.id}
                            onClick={() => handleAddMember(member)} // 멤버 클릭 시 초대 핸들러 호출
                        >
                            <div className="relative w-[4rem] h-[4rem]">
                                <Image
                                    src={memberData?.imageUrl}
                                    alt="profile-image"
                                    fill
                                    className="rounded-md"
                                />
                            </div>
                            <p className="w-full text-center text-dr-body-4 overflow-hidden text-ellipsis whitespace-nowrap">
                                {member.memberInfo?.nickname}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p className="py-[0.5rem] text-dr-body-3 text-dr-gray-100">
                    컨퍼런스에 초대할 멤버 ( {selectedMembers.length} /{' '}
                    {maxInviteMemberCount} )
                </p>
                <div className="flex flex-wrap gap-2">
                    {selectedMembers.length > 0 &&
                        selectedMembers.map((member) => (
                            <div
                                className={`bg-dr-indigo-100 p-[1rem] w-[7rem] h-[7rem] duration-200 hover:bg-dr-gray-500 cursor-pointer flex flex-col items-center gap-1 rounded-md ${
                                    selectedMembers.some(
                                        (member) =>
                                            member.memberInfo.id ===
                                            memberData?.id,
                                    )
                                        ? 'border border-blue-500'
                                        : ''
                                }`}
                                key={member.memberInfo?.id}
                                onClick={() => handleRemoveMember(member)} // 멤버 클릭 시 초대 핸들러 호출
                            >
                                <div className="relative w-[4rem] h-[4rem] animate-popIn">
                                    <Image
                                        src={member.memberInfo?.imageUrl}
                                        alt="profile-image"
                                        fill
                                        className="rounded-md"
                                    />
                                </div>
                                <p className="w-full text-center text-dr-body-4 overflow-hidden text-ellipsis whitespace-nowrap">
                                    {member.memberInfo?.nickname}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
            <div>
                {isMemberSelected && (
                    <p className="text-dr-body-1 text-dr-coral-500">
                        * 초대할 멤버를 선택해주세요. *
                    </p>
                )}
                <div className="py-3">
                    <Button
                        onClick={handleInviteConferenceMember}
                        color="coral"
                        size="lg"
                    >
                        선택된 멤버 초대하기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InviteMembersBox;
