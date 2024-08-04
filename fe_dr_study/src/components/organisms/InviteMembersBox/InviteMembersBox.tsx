import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { POST } from '@/app/api/routeModule';
import { Button } from '@/components/atoms';
import { ConferenceMember } from '@/interfaces/conference';
import { useEffect, useState } from 'react';

interface InviteMembersBoxProps {
    members: ConferenceMember[]; // 초대할 멤버 목록
    conferenceId?: number; // 회의 ID (선택적)
    setIsMemberInvited: (isMemberInvited: boolean) => void; // 초대 상태를 설정하는 함수
}

const InviteMembersBox = ({
    members,
    conferenceId,
    setIsMemberInvited,
}: InviteMembersBoxProps) => {
    const [selectedMembers, setSelectedMembers] = useState<ConferenceMember[]>(
        [],
    ); // 선택된 멤버 상태
    const [isMemberSelected, setIsMemberSelected] = useState<boolean>(false); // 멤버 선택 여부

    // 멤버 초대 핸들러
    const handleInviteMember = (member: ConferenceMember) => {
        // 이미 선택된 멤버인지 확인
        if (selectedMembers.some((m) => m.id === member.id)) {
            // 선택된 멤버라면 목록에서 제거
            setSelectedMembers((prev) =>
                prev.filter((m) => m.id !== member.id),
            );
        } else {
            // 선택되지 않은 멤버라면 목록에 추가
            setSelectedMembers((prev) => [...prev, member]);
        }
    };

    // 선택된 멤버 제거 핸들러
    const handleRemoveMember = (member: ConferenceMember) => {
        setSelectedMembers((prev) => prev.filter((m) => m.id !== member.id)); // 목록에서 제거
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
                console.log('초대할 멤버 아이디: ', member.id);
                return POST({
                    API: API,
                    endPoint: `${conferenceId}/invite`,
                    body: {
                        inviteeId: member.id,
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

    return (
        <div>
            <div>
                멤버 초대하기:
                <div className="flex flex-wrap gap-2">
                    {members.map((member) => (
                        <Button
                            key={member.id}
                            rounded={true}
                            onClick={() => handleInviteMember(member)} // 멤버 클릭 시 초대 핸들러 호출
                            color={
                                selectedMembers.some((m) => m.id === member.id)
                                    ? 'coral'
                                    : 'dark'
                            }
                        >
                            {member.nickname}
                        </Button>
                    ))}
                </div>
            </div>
            <div>
                초대할 멤버:
                <div className="flex gap-dr-5">
                    {selectedMembers.length > 0 &&
                        selectedMembers.map((member) => (
                            <Button
                                key={member.id}
                                rounded={true}
                                color="gray"
                                onClick={() => handleRemoveMember(member)} // 클릭 시 멤버 제거 핸들러 호출
                            >
                                {member.nickname}
                                <span className="text-dr-gray">[X]</span>
                            </Button>
                        ))}
                </div>
            </div>
            <div>
                {isMemberSelected && (
                    <span className="text-dr-gray-300">
                        * 초대할 멤버를 선택해주세요. *
                    </span>
                )}
                <Button onClick={handleInviteConferenceMember} color="coral">
                    선택한 멤버 초대하기
                </Button>
            </div>
        </div>
    );
};

export default InviteMembersBox;
