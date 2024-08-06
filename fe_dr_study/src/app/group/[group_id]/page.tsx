import Image from 'next/image';
import { Button, Label } from '@/components/atoms';

import { postGroupAdmissionApply } from './_api/csr';
import { SectionContents } from '../_components/SectionContents';
import GroupApplyButton from '../_components/GroupApplyButton';
import { fetchGroupWithMembersData } from './_api/ssr';

export default async function GroupDetailPage({
    params,
}: {
    params: { group_id: string };
}) {
    const groupId = params.group_id;

    const groupWithMembers = await fetchGroupWithMembersData(groupId);

    return (
        <div className="w-full bg-dr-indigo-200 flex flex-col">
            <div className="SECTION-THUMBNAIL w-full h-max flex flex-row bg-dr-dark-300 rounded-l-xl">
                <div className="LEFT-IMAGE-THUMBNAIL w-1/3 h-[50vh] rounded-l-xl bg-red-200 relative overflow-hidden">
                    <Image
                        alt="avatar"
                        src="/images/group_thumbnail_1.png"
                        fill
                    />
                </div>
                <div className="RIGHT-INFO-GROUP flex flex-col px-10 py-6 w-2/3 h-auto">
                    <div className=" w-full h-full flex flex-col justify-between">
                        <div className="TOP-INFO-GROUP w-full h-1/2  flex flex-row justify-between">
                            <div className="TL-LIST-INFO-BASE flex flex-col justify-between gap-3  w-max h-full max-w-[33%]">
                                <div className="INFO-TITLE text-dr-header-3 text-dr-white font-bold w-">
                                    {groupWithMembers?.name}
                                </div>
                                <div className="INFO-DUE-DATE text-dr-body-4 text-dr-gray-100">{`${groupWithMembers?.createdAt} ~ ${groupWithMembers?.dueDate} | 1일째 진행 중`}</div>
                                <div className="INFO-DESCRIPTION text-dr-body-4 text-dr-gray-100">
                                    {groupWithMembers?.description}
                                </div>
                            </div>
                            <div className="TR-BUTTON">
                                <GroupApplyButton groupId={groupId} />
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
                                    {groupWithMembers.members.length &&
                                        groupWithMembers.members.length + ' /'}
                                    {' ' + groupWithMembers.memberCapacity}
                                </div>
                                <ul className="LIST-MEMBER-IMAGES flex flex-row gap-1">
                                    {groupWithMembers?.members
                                        .slice(0, 3)
                                        .map((_, i) => (
                                            <li key={i}>
                                                <div className="relative overflow-hidden w-10 h-10 rounded-xl">
                                                    <Image
                                                        alt="avatar"
                                                        src={`/images/member_thumbnail_${i + 1}.png`}
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
                            <div className="BR-LIST-BUTTON flex flex-row gap-3 h-8">
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
                                <Button
                                    color="dark"
                                    // onClick={onClickRouteToLeave}
                                >
                                    탈퇴
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 요자리에 섹션컨텐츠 들어가야함 */}
            <SectionContents groupId={groupId} />
        </div>
    );
}
