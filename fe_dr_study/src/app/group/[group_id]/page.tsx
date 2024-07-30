'use client';
import React, { useState } from 'react';

import StudyGroupTemplate from '@/components/template/study-group/StudyGroupTemplate';
import Image from 'next/image';
import { Button, Label, Paragraph } from '@/components/atoms';

function trimString(input: string, length: number) {
    const maxLength = length;
    if (input.length <= maxLength) {
        return input;
    }
    return input.slice(0, maxLength) + '...';
}

const dummyData = {
    title: '삼성전자 면접 스터디',
    created_at: '2024.07.22',
    due_date: '2024.08.16',
    description:
        '삼성전자 면접에 대비하는 스터디 그룹입니다. 주 2회정도 운영하며, 면접 스터디에 특화된 AI 사회자를 주로 사용합니다.',
};

const articlesDummyData = [
    {
        title: '스터디 운영방식에 대한 논의 필요성',
        content:
            '지금까지 1달 가량 스터디를 진행해왔는데, 스터디 방식에 대한 고민과 개선의 필요성을 느껴',
        tags: ['스터디 운영', '공지사항'],
        timeAgo: '3시간 전',
        member: {
            id: 1,
            nickname: '조성우',
        },
    },
    {
        title: '스터디 운영방식에 대한 논의 필요성',
        content:
            '지금까지 1달 가량 스터디를 진행해왔는데, 스터디 방식에 대한 고민과 개선의 필요성을 느껴',
        tags: ['스터디 운영', '공지사항'],
        timeAgo: '3시간 전',
        member: {
            id: 1,
            nickname: '조성우',
        },
    },
    {
        title: '스터디 운영방식에 대한 논의 필요성',
        content:
            '지금까지 1달 가량 스터디를 진행해왔는데, 스터디 방식에 대한 고민과 개선의 필요성을 느껴',
        tags: ['스터디 운영', '공지사항'],
        timeAgo: '3시간 전',
        member: {
            id: 1,
            nickname: '조성우',
        },
    },
];

const GroupPage = () => {
    const conferenceListDummyData = [
        {
            title: '일일 정기 면접 스터디',
            isEnd: true,
            startTime: '10:00',
            targetEndTime: '11:30',
            participantData: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
        },
        {
            title: '주간 토론면접 대비 스터디',
            isEnd: false,
            startTime: '14:30',
            targetEndTime: null,
            participantData: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
        },
    ];
    const [activeTab, setActiveTab] = useState('게시판');

    const renderContent = () => {
        switch (activeTab) {
            case '게시판':
                return (
                    <div className="bg-dr-dark-200 p-6 rounded-xl border-[1px] border-dr-gray-500 animate-fadeIn">
                        <div className="flex flex-col justify-start gap-4">
                            {articlesDummyData.map((article, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-dr-dark-100 hover:bg-dr-dark-300 transition-colors duration-200 border-[1px] border-dr-gray-500 rounded-lg flex flex-col gap-4 cursor-pointer"
                                >
                                    <div className="flex justify-between mb-2">
                                        <div className="font-bold text-lg text-white">
                                            {article.title}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {article.timeAgo}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-300 mb-2 w-2/3">
                                        {trimString(article.content, 45)}
                                    </div>
                                    <div className="flex space-x-2">
                                        {article.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 bg-dr-gray-500 text-dr-body-4 rounded-full text-dr-coral-100 cursor-pointer hover:font-bold transition-all duration-200"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4 flex justify-center w-full bg-dr-dark-300 py-1 rounded-md border-[1px] border-dr-gray-300">
                                <div className="flex space-x-4">
                                    <button className="text-dr-gray-400 w-6 text-center hover:text-dr-white transition-colors duraion-150">
                                        1
                                    </button>
                                    <button className="text-dr-gray-400 w-6 text-center hover:text-dr-white transition-colors duraion-150">
                                        2
                                    </button>
                                    <button className="text-dr-gray-400 w-6 text-center hover:text-dr-white transition-colors duraion-150">
                                        3
                                    </button>
                                    <button className="text-dr-gray-400 w-6 text-center hover:text-dr-white transition-colors duraion-150">
                                        4
                                    </button>
                                    <button className="text-dr-gray-400 w-6 text-center hover:text-dr-white transition-colors duraion-150">
                                        5
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case '채팅방':
                return <div></div>; // Placeholder for Chatroom content
            case '스터디 이력':
                return <div></div>; // Placeholder for Study History content
            default:
                return null;
        }
    };
    return (
        <div
            // className={pageStyles}
            className="w-full bg-dr-indigo-200 flex flex-col"
        >
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
                                            <button className="relative overflow-hidden w-10 h-10 rounded-xl border-[1px] border-dr-coral-100 bg-dr-coral-200 hover:bg-dr-coral-100 transition-colors duration-200 flex items-center justify-center">
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
            <div className="SECTION-CONTENTS w-full h-max flex flex-row  px-6 mt-8">
                <div className="LEFT-CONTENTS flex flex-col w-2/5 h-full  p-4">
                    <div className="SUBTITLE flex flex-row gap-4 items-end text-dr-white mb-4">
                        <div className="text-dr-header-2 font-medium text-dr-white pl-2">
                            Today
                        </div>
                        <div className="text-dr-body-3">
                            오늘의 스터디 일정을 확인하세요.
                        </div>
                    </div>
                    <div className="LIST-CONFERENCE-TODAY space-y-4">
                        {conferenceListDummyData.map((conference, index) => (
                            <div
                                key={index}
                                className={`CONFERENCE-CARD h-max min-h-32 p-6 rounded-lg shadow-md cursor-pointer transition-colors duration-200 ${
                                    conference.isEnd
                                        ? 'bg-[#212534] hover:bg-[#2125347c]'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                            >
                                <div className="flex flex-col justify-between mb-2">
                                    <div className="text-white font-bold text-lg">
                                        {conference.title}
                                    </div>
                                    {conference.isEnd ? (
                                        <div className="text-dr-gray-100 text-dr-body-4">
                                            {conference.startTime} ~{' '}
                                            {conference.targetEndTime} | 3시간
                                            전 종료
                                        </div>
                                    ) : (
                                        <div className="text-dr-gray-100 text-dr-body-4">
                                            {conference.startTime} | 진행 대기
                                            중
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 w-full flex flex-row justify-between items-end">
                                    <div className="BL-INFO-MEMBER-LIST flex flex-col gap-1">
                                        <div className="text-dr-body-4 text-dr-gray-100">
                                            6 / 8
                                        </div>
                                        <ul className="LIST-MEMBER-IMAGES flex flex-row gap-1">
                                            {conference.participantData
                                                .slice(0, 3)
                                                .map((participant, i) => (
                                                    <li key={i}>
                                                        <div className="relative overflow-hidden w-10 h-10 rounded-xl">
                                                            <Image
                                                                alt="avatar"
                                                                src={`/images/member_thumbnail_${i + 1}.png`}
                                                                // src={`https://example-s3-url.com/avatars/${participant.id}`}
                                                                layout="fill"
                                                            />
                                                        </div>
                                                    </li>
                                                ))}
                                            {conference.participantData.length >
                                                3 && (
                                                <li key="extra">
                                                    <button className="relative overflow-hidden w-10 h-10 rounded-xl border-[1px] border-dr-coral-100 bg-dr-coral-200 hover:bg-dr-coral-100 transition-colors duration-200 flex items-center justify-center">
                                                        <span className="text-white font-semibold text-dr-body-3">
                                                            +
                                                            {conference
                                                                .participantData
                                                                .length - 3}
                                                        </span>
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    {!conference.isEnd && (
                                        <Button classNameStyles="!h-8 bg-dr-coral-100">
                                            스터디 참여
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <Button
                            outlined
                            rounded
                            fullWidth
                            classNameStyles="text-dr-white"
                        >
                            새 컨퍼런스 개설
                        </Button>
                    </div>
                </div>
                <div className="DIVIDER-VERTICAL mx-8 w-[1.5px] h-auto my-32 bg-dr-dark-200 "></div>
                <div className="RIGHT-CONTENTS flex flex-col justify-start gap-2 w-3/5 h-auto">
                    <div className="RIGHT-TOP-SWITCH-BAR">
                        <div className="SWITCH-TITLE-BOX flex flex-row gap-4 items-end text-dr-white mb-4 ">
                            <div className="SWITCH-TITLE text-dr-header-3 text-dr-white font-bold !line-height-[2.5rem]">
                                {activeTab}
                            </div>
                            <div className="SWITCH-DESCRIPTION text-dr-body-3 pb-1">
                                {`삼성전자 면접 스터디`} 그룹의 게시글을
                                확인해보세요.
                            </div>
                        </div>
                        <div className="SWITCH-BUTTON-GROUP flex flex-row gap-2">
                            <Button
                                color="white"
                                classNameStyles={`${
                                    activeTab === '게시판'
                                        ? '!text-dr-black font-bold border border-2 border-transparent'
                                        : 'bg-transparent font-bold border border-2 border-white hover:bg-white hover:text-black'
                                }`}
                                onClick={() => setActiveTab('게시판')}
                            >
                                게시판
                            </Button>
                            <Button
                                color="white"
                                classNameStyles={`${
                                    activeTab === '채팅방'
                                        ? '!text-dr-black font-bold border border-2 border-transparent'
                                        : 'bg-transparent font-bold border border-2 border-white hover:bg-white hover:text-black'
                                }`}
                                onClick={() => setActiveTab('채팅방')}
                            >
                                채팅방
                            </Button>
                            <Button
                                color="white"
                                classNameStyles={`${
                                    activeTab === '스터디 이력'
                                        ? '!text-dr-black font-bold border border-2 border-transparent'
                                        : 'bg-transparent font-bold border border-2 border-white hover:bg-white hover:text-black'
                                }`}
                                onClick={() => setActiveTab('스터디 이력')}
                            >
                                스터디 이력
                            </Button>
                        </div>
                    </div>
                    <div className="DIVIDER-HORIZONTAL w-full h-[2px] bg-dr-dark-200 my-4"></div>
                    <div className="RIGHT-BOTTOM-SWITCHED-CONTENT w-full h-max mb-4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupPage;
