'use client';
import Image from 'next/image';
import {
    dummyArticlesData,
    dummyConferencesWithMembers,
} from '../[group_id]/dummy';
import { Button } from '@/components/atoms';
import { useRouter } from 'next/navigation';
import { trimString } from '@/utils/trimString';
import { ReactNode, useState } from 'react';
import ListConferenceToday from './ConferenceWithMembers';

interface SectionContentsProps {
    groupId: string;
}

export const SectionContents: React.FC<SectionContentsProps> = ({
    groupId,
}) => {
    const [activeTab, setActiveTab] = useState<
        '게시판' | '채팅방' | '스터디 이력'
    >('게시판');

    const renderContent = (activeTab: string, groupId: string) => {
        const router = useRouter();
        switch (activeTab) {
            case '게시판':
                return (
                    <div className="bg-dr-dark-200 p-6 rounded-xl border-[1px] border-dr-gray-500 animate-fadeIn">
                        <div className="flex flex-col justify-start gap-4">
                            {dummyArticlesData.map((article, index) => (
                                <div
                                    onClick={(e) => {
                                        router.push(
                                            `/group/${groupId}/article/${article.id}`,
                                        );
                                    }}
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
                return <div></div>;
            case '스터디 이력':
                return <div></div>;
            default:
                return null;
        }
    };

    const router = useRouter();
    const conferencesWithMembers = dummyConferencesWithMembers;
    return (
        <div className="SECTION-CONTENTS w-full h-max flex flex-row px-6 mt-8">
            <div className="LEFT-CONTENTS flex flex-col w-2/5 h-full  p-4">
                <div className="SUBTITLE flex flex-row gap-4 items-end text-dr-white mb-4">
                    <div className="text-dr-header-2 font-medium text-dr-white pl-2">
                        Today
                    </div>
                    <div className="text-dr-body-3">
                        오늘의 스터디 일정을 확인하세요.
                    </div>
                </div>
                <ListConferenceToday conferences={conferencesWithMembers} />
                <div className="mt-6 text-center">
                    <Button
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                            alert('새 컨퍼런스 생성 모달 만들어서 띄워줘야함.');
                        }}
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
                    {renderContent(activeTab, groupId)}
                </div>
            </div>
        </div>
    );
};
