import React from 'react';

import StudyGroupTemplate from '@/components/template/study-group/StudyGroupTemplate';
import Image from 'next/image';
import { Button, Label, Paragraph } from '@/components/atoms';

const dummyData = {
    title: '삼성전자 면접 스터디',
    created_at: '2024.07.22',
    due_date: '2024.08.16',
    description:
        '삼성전자 면접에 대비하는 스터디 그룹입니다. 주 2회정도 운영하며, 면접 스터디에 특화된 AI 사회자를 주로 사용합니다.',
};

const GroupPage = () => {
    return (
        <div
            // className={pageStyles}
            className="w-full h-full bg-dr-indigo-200 flex flex-col"
        >
            <div className="SECTION-THUMBNAIL w-full h-[50%] min-h-[50vh] flex flex-row bg-dr-dark-300 rounded-l-xl">
                <div className="LEFT-IMAGE-THUMBNAIL w-1/3 h-full rounded-l-xl bg-red-200 relative overflow-hidden">
                    <Image
                        alt="avatar"
                        src="/images/group_thumbnail_1.png"
                        fill
                    />
                </div>
                <div className="RIGHT-INFO-GROUP flex flex-col px-10 py-6 w-2/3 h-full">
                    <div className=" w-full h-full flex flex-col justify-between">
                        <div className="TOP-INFO-GROUP w-full h-1/2  flex flex-row justify-between">
                            <div className="TL-LIST-INFO-BASE flex flex-col gap-3  w-max h-full max-w-[33%]">
                                <div className="INFO-TITLE text-dr-header-3 text-dr-white font-bold w-">
                                    {dummyData.title}
                                </div>
                                <div className="INFO-DUE-DATE text-dr-body-4 text-dr-gray-100">{`${dummyData.created_at} ~ ${dummyData.due_date} | 1일째 진행 중`}</div>
                                <div className="INFO-DESCRIPTION text-dr-body-4 text-dr-gray-100">
                                    {dummyData.description}
                                </div>
                            </div>
                            <div className="TR-BUTTON">
                                <Button>스터디 가입 신청</Button>
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
                                    6 / 8
                                </div>
                                <ul className="LIST-MEMBER-IMAGES flex flex-row gap-1">
                                    {[1, 2, 3, 4].slice(0, 3).map((_, i) => (
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
                                    {[1, 2, 3, 4].length > 3 && (
                                        <li key="extra">
                                            <button className="relative overflow-hidden w-10 h-10 rounded-xl border-[1px] border-dr-coral-100 bg-dr-coral-200 hover:bg-dr-coral-100 transition-colors duration-100 flex items-center justify-center">
                                                <span className="text-white font-semibold text-dr-body-3">
                                                    +{[1, 2, 3, 4].length - 3}
                                                </span>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="BR-LIST-BUTTON flex flex-row gap-3 h-8">
                                <Button color="dark">그룹 관리</Button>
                                <Button color="dark">팀원 관리</Button>
                                <Button color="dark">탈퇴</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SECTION-CONTENTS w-full h-max min-h-[55vh] flex flex-row bg-blue-500 px-8 mt-8">
                <div className="LEFT-CONTENTS flex flex-col w-1/2 h-full bg-yellow-300">
                    <div className="bg-yellow-600 w-full h-full"></div>
                </div>
                <div className="DIVIDER-VERTICAL mx-8 border border-dr-gray-300"></div>
                <div className="RIGHT-CONTENTS flex flex-col w-1/2 h-full bg-yellow-300"></div>
            </div>
        </div>
    );
};

export default GroupPage;
