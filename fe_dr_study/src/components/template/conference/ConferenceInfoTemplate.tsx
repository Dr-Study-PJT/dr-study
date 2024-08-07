'use client';

import { ErrorLottie } from '@/app/_components/Lottie/Error/ErrorLottie';
import { Button } from '@/components/atoms';
import ToolTip from '@/components/atoms/Tooltip/ToolTip';
import InviteMembersBox from '@/components/organisms/InviteMembersBox/InviteMembersBox';
import SelectModeratorBox from '@/components/organisms/SelectModeratorBox/SelectModeratorBox';
import { ConferenceData, ConferenceMember } from '@/interfaces/conference';
import { Moderator } from '@/interfaces/moderator';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ConferenceInfoProps {
    memberData: any; // any 타입 수정 !필요!
    conferenceId: number; // 회의 ID
    conferenceData: ConferenceData; // 회의 데이터
    moderators: Moderator[]; // 사회자 리스트
    studyMembers: ConferenceMember[]; // 스터디 멤버 리스트
    handleOpenConference: () => void; // 컨퍼런스 개최 함수
}

const ConferenceInfoTemplate = ({
    memberData,
    conferenceId,
    conferenceData,
    moderators,
    studyMembers,
    handleOpenConference,
}: ConferenceInfoProps) => {
    const [isMemberInvited, setIsMemberInvited] = useState<boolean>(true); // 멤버 초대 여부
    const [isClosedConference, setIsClosedConference] =
        useState<boolean>(false); // 컨퍼런스 종료 여부

    // console.log('conferenceData =>', conferenceData);
    // useEffect(() => {
    //     if (new Date(conferenceData?.finishTime) < new Date()) {
    //         setIsClosedConference(true);
    //     }
    // }, [conferenceData]);

    // const router = useRouter();

    // const [studyMembers, setStudyMembers] = useState<ConferenceMember[]>([]); // 스터디 멤버 상태
    // const [isMemberInvited, setIsMemberInvited] = useState<boolean>(true); // 멤버 초대 여부

    // const [moderators, setModerators] = useState<Moderator[]>([]); // 사회자 여부
    // const [isModeratorInvited, setIsModeratorInvited] =
    //     useState<boolean>(false); // 사회자 선택 여부

    // // 스터디 멤버를 가져오는 함수
    // useEffect(() => {
    //     const handleGetStudyMembers = async () => {
    //         try {
    //             const response = await GET(`v1/groups`, {
    //                 params: `${1}/members`,
    //                 isAuth: true,
    //                 revalidateTime: 10,
    //             });

    //             console.log('스터디 멤버 리스트 조회 성공:', response.data);

    //             setStudyMembers(response.data.content);
    //         } catch (error) {
    //             console.error('스터디 멤버 리스트 조회 실패:', error);
    //         }
    //     };

    //     handleGetStudyMembers();
    // }, [conferenceData]);

    // 사회자 리스트를 가져오는 함수
    // useEffect(() => {
    //     const handleGetModerators = async () => {
    //         try {
    //             const response = await GET(`v1/moderators`, {
    //                 params: '',
    //                 isAuth: true,
    //                 revalidateTime: 10,
    //             });

    //             console.log('사회자 리스트 조회 성공:', response.data);
    //             const { data } = response.data;

    //             setModerators(data);
    //         } catch (error) {
    //             console.error('사회자 리스트 조회 실패:', error);
    //         }
    //     };

    //     handleGetModerators();
    // }, []);

    // 모의 스터디 멤버 데이터 설정
    // useEffect(() => {
    //     setStudyMembers([
    //         {
    //             id: 1,
    //             nickname: '박경모',
    //             imageId: '/images/group_thumbnail_1.png',
    //             role: '팀원',
    //             joinDate: '2024-08-04T09:38:48.270Z', // 가입 날짜
    //         },
    //         {
    //             id: 2,
    //             nickname: '장철현',
    //             imageId: '/images/group_thumbnail_1.png',
    //             role: '팀원',
    //             joinDate: '2024-08-04T09:38:48.270Z', // 가입 날짜
    //         },
    //         {
    //             id: 3,
    //             nickname: '조성우',
    //             imageId: '/images/group_thumbnail_1.png',
    //             role: '팀원',
    //             joinDate: '2024-08-04T09:38:48.270Z', // 가입 날짜
    //         },
    //     ]);
    // }, []);

    // const handleOpenConference = async () => {
    //     console.log('컨퍼런스 개최 요청 시작');
    //     console.log(conferenceData);
    //     try {
    //         const response = await POST({
    //             API: API,
    //             endPoint: `${conferenceId}/open`,
    //             body: '',
    //             isAuth: true,
    //         });

    //         console.log(
    //             '컨퍼런스 개최 성공(handleOpenConference):',
    //             response.data,
    //         );
    //         router.push(`/conference/${conferenceId}`);
    //     } catch (error) {
    //         console.error('컨퍼런스 개최 실패(handleOpenConference):', error);
    //     }
    // };

    // const startTime = new Date(conferenceData?.startTime);
    // const finishTime = new Date(conferenceData?.finishTime);
    // const durationInMs = finishTime.getTime() - startTime.getTime();

    // // 밀리초를 시간과 분으로 변환
    // const durationInMinutes = Math.floor(durationInMs / 60000);
    // const hours = Math.floor(durationInMinutes / 60);
    // const minutes = durationInMinutes % 60;

    return (
        <div className=" text-dr-white flex flex-col justify-center items-center bg-dr-indigo-200 p-[6rem]">
            {isClosedConference ? (
                <div className="flex text-center flex-col content-center justify-center items-center text-dr-white h-[100dvh]">
                    <div className="">
                        <h2 className="text-dr-header-2">
                            이미 종료된 컨퍼런스 입니다.
                        </h2>
                        <ErrorLottie />
                        <Button rounded color="gray" fullWidth>
                            <Link href="/">홈으로</Link>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-dr-5 w-full max-w-[80%] h-full border-2 border-dr-gray-500 p-4 rounded-md p-[2rem]">
                    <div className="flex">
                        <div className="flex-1 rounded-lg">
                            <h2 className="text-dr-header-3 font-bold mb-2 text-dr-primary ">
                                {conferenceData?.title}
                            </h2>
                            <div className="flex flex-col gap-3 text-dr-body-1">
                                <p className="text-dr-body-4 text-dr-gray-300">
                                    <span>
                                        {/* {startTime.toLocaleString()} |{' '}
                                    {finishTime.toLocaleString()} ({' '}
                                    {`${hours}시간 ${minutes}분`} ) */}
                                    </span>{' '}
                                </p>
                                <div className="relative w-[10rem] h-[10rem] rounded-lg overflow-hidden">
                                    <Image
                                        src={'/images/group_thumbnail_1.png'}
                                        alt={'group-thumbnail'}
                                        fill
                                    />
                                </div>
                                <p className="text-dr-body-3">
                                    <span className="">컨퍼런스 주제:</span>{' '}
                                    {conferenceData?.subject}
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr className="border-t border-dr-gray-500 my-4" />

                    <div className="flex flex-col text-center">
                        <p className="text-dr-body-4 text-dr-gray-300">
                            Meeting URL:
                        </p>
                        <p className="text-dr-header-2 font-semibold">{`${process.env.NEXT_PUBLIC_HOST}/conference/${conferenceData?.id}`}</p>
                    </div>

                    <hr className="border-t border-dr-gray-500 my-4" />

                    <SelectModeratorBox moderators={moderators} />

                    <hr className="border-t border-dr-gray-500 my-4" />
                    <InviteMembersBox
                        memberData={memberData}
                        members={studyMembers}
                        conferenceId={conferenceId}
                        setIsMemberInvited={setIsMemberInvited}
                        capacity={conferenceData?.memberCapacity}
                    />
                    <hr className="border-t border-dr-gray-500 my-4" />
                    <div className="py-[1rem]">
                        <Button
                            onClick={handleOpenConference}
                            color={`${!isMemberInvited ? 'gray' : 'coral'}`}
                            disabled={!isMemberInvited}
                            size="lg"
                            classNameStyles={`relative group ${!isMemberInvited ? 'cursor-not-allowed' : ''}`}
                        >
                            컨퍼런스 개최
                            <ToolTip
                                isVisible={!isMemberInvited}
                                content="한 명 이상 초대하여 컨퍼런스를 시작할 수 있습니다."
                            />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConferenceInfoTemplate;
