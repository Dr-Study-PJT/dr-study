'use client';
import Image from 'next/image';
import { dummyConferenceListData } from '@/components/organisms/SideBar';
import { Button } from '@/components/atoms';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsModalOpen, setModalContent } from '@/store/slices/modalSlice';
import ListConferenceToday from '../ConferenceWithMembers';
import ArticleListContent from './ArticleListContent';

interface SectionContentsProps {
    groupId: string;
}

export const SectionContents: React.FC<SectionContentsProps> = ({
    groupId,
}) => {
    const [activeTab, setActiveTab] = useState<
        '게시판' | '채팅방' | '스터디 이력'
    >('게시판');

    const dispatch = useDispatch();

    const handleClickOpenConference = () => {
        dispatch(setIsModalOpen());
        dispatch(setModalContent('CreateConferenceForm'));
    };

    const renderContent = (activeTab: string, groupId: string) => {
        switch (activeTab) {
            case '게시판':
                return <ArticleListContent groupId={groupId} />;
            case '채팅방':
                return <div>채팅방 내용</div>;
            case '스터디 이력':
                return <div>스터디 이력 내용</div>;
            default:
                return null;
        }
    };

    const conferencesWithMembers = dummyConferenceListData;

    return (
        <div className="SECTION-CONTENTS w-full h-max flex flex-row px-6 mt-8">
            <div className="LEFT-CONTENTS flex flex-col w-2/5 h-full p-4">
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
                        onClick={handleClickOpenConference}
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
                    <div className="SWITCH-TITLE-BOX flex flex-row gap-4 items-end text-dr-white mb-4">
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
