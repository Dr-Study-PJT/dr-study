'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/atoms/Logo/Logo';
import Link from 'next/link';
import { Button } from '@/components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSigned, TIsSigned } from '@/store/slices/authSlice';
import { setMemberState, clearMemberState } from '@/store/slices/memberSlice';
import { RootState } from '@/store';
import {
    getSessionStorageItem,
    removeMemberData,
} from '@/utils/sessionStorage';
import { GET, POST } from '@/app/api/routeModule';
import Icon from '@/components/atoms/Icon/Icon';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import {
    NavigationLinksProps,
    NotificationData,
    ProfileDropDownProps,
} from './Navigation.types';
import Tooltip from '../SideBar/Tooltip';
import { groupAPI, notificationAPI } from '@/app/api/axiosInstanceManager';
import MemberAvatar from '@/components/molecules/MemberAvatar';

// 알림 읽음 상태로 변경하는 함수
const handleReadNotification = async (
    notificationId: number,
    fetchNotifications: () => void,
) => {
    try {
        const response = await POST({
            API: notificationAPI,
            isAuth: true,
            endPoint: `${notificationId}/read`,
        });

        if (response.status === 200) {
            console.log('Notification 읽음 처리 성공:', response.data);
            fetchNotifications(); // 알림 갱신
        }
    } catch (error) {
        console.error('Notification 읽음 처리 실패:', error);
    }
};

// 스터디 그룹 신청을 승인하는 함수
const handleApproveApplication = async (
    applicationId: number,
    fetchNotifications: () => void,
) => {
    try {
        const response = await POST({
            API: groupAPI,
            isAuth: true,
            endPoint: `applications/${applicationId}/reply`,
            body: {
                applicationStatus: 'APPROVED',
                replyMessage: '승인이 완료되었습니다.',
            },
        });

        if (response.status === 200) {
            console.log('Application 승인 처리 성공:', response.data);
            fetchNotifications(); // 알림 갱신
        }
    } catch (error) {
        console.error('Application 승인 처리 실패:', error);
    }
};

// 스터디 그룹 신청을 거절하는 함수
const handleRejectApplication = async (
    applicationId: number,
    fetchNotifications: () => void,
) => {
    try {
        const response = await POST({
            API: groupAPI,
            isAuth: true,
            endPoint: `applications/${applicationId}/reply`,
            body: {
                applicationStatus: 'DENIED',
                replyMessage: '죄송합니다. 가입이 거절되었습니다.',
            },
        });

        if (response.status === 200) {
            console.log('Application 거절 처리 성공:', response.data);
            fetchNotifications(); // 알림 갱신
        }
    } catch (error) {
        console.error('Application 거절 처리 실패:', error);
    }
};

const Navigation = ({ scrollPosition }: { scrollPosition: string }) => {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();

    const isSigned = useSelector((state: RootState) => state.auth.isSigned);
    const memberData = useSelector((state: RootState) => state.member);

    const profileImageBoxRef = useRef<HTMLDivElement>(null);

    const bellRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    const queryClient = useQueryClient();

    const fetchNotifications = async () => {
        try {
            const response = await GET('v1/notifications', {
                isAuth: true,
                revalidateTime: 0,
            });
            console.log('GET 알림 데이터 : ', response.data);
            setNotifications(response.data);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    useEffect(() => {
        if (memberData.id) {
            fetchNotifications();
            const intervalId = setInterval(fetchNotifications, 30000); // 30초마다 알림 데이터 가져오기

            return () => clearInterval(intervalId);
        }
    }, [memberData]);

    useEffect(() => {
        const memberData = getSessionStorageItem('memberData');
        if (memberData) {
            dispatch(setMemberState(memberData));
            dispatch(setIsSigned(TIsSigned.T));
        } else {
            dispatch(setIsSigned(TIsSigned.F));
        }
    }, [dispatch]);

    // notification 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notificationRef.current &&
                bellRef.current &&
                !notificationRef.current.contains(event.target as Node) &&
                !bellRef.current.contains(event.target as Node)
            ) {
                setIsNotificationOpen(false); // 알림창 닫기
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onClickSetLogout = async () => {
        removeMemberData();
        dispatch(clearMemberState());
        dispatch(setIsSigned(TIsSigned.F));
        setDropdownOpen(false);
        queryClient.removeQueries({ queryKey: ['memberData'] });
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        setIsNotificationOpen(false);
    };

    const toggleIsNotificationOpen = () => {
        setDropdownOpen(false);
        setIsNotificationOpen(!isNotificationOpen);
    };

    const arrowButtonStyles =
        'rounded-full p-1 bg-dr-indigo-0 text-white flex items-center justify-center hover:bg-zinc-600 transition-colors duration-200';

    const navBoxStyles = {
        backdropFilter:
            scrollPosition === 'top' ? 'none' : 'blur(6px) saturate(180%)',
        backgroundColor:
            scrollPosition === 'top' ? '#181b27' : 'rgba(38, 38, 39, 0.5)',
        transition: 'background-color 0.3s, backdrop-filter 0.3s',
    };

    return (
        <div
            className={`NAVIGATION-BOX  w-full fixed flex flex-row justify-between top-0 h-[3rem] items-center px-3 border-b-[1px] border-dr-indigo-100`}
            style={navBoxStyles}
        >
            <div className="flex gap-2 ml-1">
                <button
                    className={arrowButtonStyles}
                    onClick={() => router.back()}
                >
                    <FaArrowLeft size={16} />
                </button>
                <button
                    className={arrowButtonStyles}
                    onClick={() => router.forward()}
                >
                    <FaArrowRight size={16} />
                </button>
            </div>
            <NavigateLinks pathname={pathname} />
            <div>
                {isSigned === TIsSigned.T ? (
                    <div>
                        <div className="flex items-center content-center gap-[0.5rem]">
                            <div className="relative flex items-center">
                                <Tooltip
                                    text={memberData?.nickname as string}
                                    direction="bottom"
                                >
                                    <div
                                        ref={profileImageBoxRef}
                                        className="relative transition-all duration-300 w-[2rem] h-[2rem] animate-popIn overflow-hidden cursor-pointer"
                                    >
                                        <Image
                                            onClick={toggleDropdown}
                                            className="rounded-[10rem] border-2 border-dr-white hover:border-dr-black transition-all duration-300 bg-dr-coral-50 hover:bg-dr-coral-100"
                                            src={memberData?.imageUrl}
                                            alt="Group Image"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </Tooltip>
                                {dropdownOpen ? (
                                    <ProfileDropDown
                                        memberData={memberData}
                                        toggleDropdown={toggleDropdown}
                                        onClickSetLogout={onClickSetLogout}
                                        profileImageBoxRef={profileImageBoxRef}
                                    />
                                ) : null}
                            </div>
                            <div
                                className={`relative text-dr-white rounded-full cursor-pointer`}
                            >
                                <div
                                    ref={bellRef}
                                    onClick={toggleIsNotificationOpen}
                                >
                                    <Tooltip text={'알림'} direction="bottom">
                                        <Icon
                                            icon="bell"
                                            size="sm"
                                            hover="gray"
                                            text="gray"
                                        />
                                        <div
                                            className={`absolute top-1 right-0 w-3 h-3 ${
                                                notifications?.length > 0
                                                    ? 'bg-dr-red text-white'
                                                    : 'bg-gray-300 text-black'
                                            } border-transparent border-2 text-dr-body-5 rounded-full flex items-center justify-center`}
                                        >
                                            {notifications?.length}
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="relative w-7 h-7">
                                {isNotificationOpen && (
                                    <div
                                        ref={notificationRef}
                                        className="absolute animate-popIn w-[15rem] right-0 top-[112%] rounded-lg shadow-lg z-20 border text-dr-white bg-dr-dark-300 border-dr-dark-200"
                                    >
                                        {notifications?.length > 0 ? (
                                            <ul className="flex flex-col text-dr-body-3 w-full">
                                                {notifications.map(
                                                    (notification, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex w-full p-2 items-center cursor-pointer hover:bg-dr-dark-100 transition-colors duration-300"
                                                        >
                                                            <div className="text-white w-full h-max flex flex-row gap-2">
                                                                <div className="relative w-[2rem] h-[2rem] animate-popIn">
                                                                    <Image
                                                                        className="rounded-[10rem] transition-all duration-300"
                                                                        src={
                                                                            notification?.imageUrl
                                                                        }
                                                                        alt="notification image"
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                    />
                                                                </div>
                                                                <div className="flex-1">
                                                                    {notification?.itemType ===
                                                                        'StudyGroupApplication' && (
                                                                        <div className="NOTIFICATION-LEFT ">
                                                                            <div className="text-dr-body-4">
                                                                                <p className="text-dr-body-4 text-dr-gray-100">
                                                                                    {`${notification?.itemInfo?.applicant?.nickname} `}
                                                                                    <span className="text-dr-gray-300">
                                                                                        님이
                                                                                    </span>
                                                                                </p>
                                                                                <p className="text-dr-gray-300">
                                                                                    <span className="text-dr-gray-100">{`${notification?.itemInfo?.groupName} 그룹 `}</span>
                                                                                    가입
                                                                                    신청
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {notification?.itemType ===
                                                                        'ConferenceInvitation' && (
                                                                        <div className="text-dr-body-4">
                                                                            <p className="text-dr-gray-100">{`${notification?.itemInfo?.title}  `}</p>
                                                                            <p className="text-dr-gray-300">
                                                                                컨퍼런스에
                                                                                초대됨
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                    {notification?.itemType ===
                                                                        'StudyGroupApplicationReply' && (
                                                                        <div className="text-dr-body-4">
                                                                            <p className="text-dr-gray-100">
                                                                                {notification
                                                                                    ?.itemInfo
                                                                                    ?.isApproved
                                                                                    ? '승인되었습니다.'
                                                                                    : '거절되었습니다.'}
                                                                            </p>
                                                                            <p className="text-dr-gray-300">
                                                                                {
                                                                                    notification
                                                                                        ?.itemInfo
                                                                                        ?.replyMessage
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex flex-row justify-end items-end pb-1 gap-1 h-auto">
                                                                    {notification?.itemType ===
                                                                        'StudyGroupApplication' && (
                                                                        <>
                                                                            <Button
                                                                                size="sm"
                                                                                classNameStyles="py-[0.3rem]"
                                                                                onClick={(
                                                                                    e,
                                                                                ) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    handleApproveApplication(
                                                                                        notification
                                                                                            .itemInfo
                                                                                            .applicationId,
                                                                                        fetchNotifications,
                                                                                    );
                                                                                }}
                                                                            >
                                                                                승락
                                                                            </Button>
                                                                            <Button
                                                                                size="sm"
                                                                                color="gray"
                                                                                classNameStyles="py-[0.3rem]"
                                                                                onClick={(
                                                                                    e,
                                                                                ) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    handleRejectApplication(
                                                                                        notification
                                                                                            .itemInfo
                                                                                            .applicationId,
                                                                                        fetchNotifications,
                                                                                    );
                                                                                }}
                                                                            >
                                                                                거절
                                                                            </Button>
                                                                        </>
                                                                    )}
                                                                    {notification?.itemType ===
                                                                        'ConferenceInvitation' && (
                                                                        <>
                                                                            <Button
                                                                                size="sm"
                                                                                classNameStyles="py-[0.3rem]"
                                                                                onClick={(
                                                                                    e,
                                                                                ) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    handleReadNotification(
                                                                                        notification?.id,
                                                                                        fetchNotifications,
                                                                                    );
                                                                                    // 컨퍼런스 대기방 이동
                                                                                    router.push(
                                                                                        `/conference/${notification?.itemInfo?.conferenceId}/waiting-room`,
                                                                                    );
                                                                                }}
                                                                            >
                                                                                승락
                                                                            </Button>
                                                                            <Button
                                                                                size="sm"
                                                                                color="gray"
                                                                                classNameStyles="py-[0.3rem]"
                                                                                onClick={(
                                                                                    e,
                                                                                ) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    handleReadNotification(
                                                                                        notification?.id,
                                                                                        fetchNotifications,
                                                                                    );
                                                                                }}
                                                                            >
                                                                                거절
                                                                            </Button>
                                                                        </>
                                                                    )}
                                                                    {notification?.itemType ===
                                                                        'StudyGroupApplicationReply' && (
                                                                        <>
                                                                            <Button
                                                                                size="sm"
                                                                                classNameStyles="py-[0.3rem]"
                                                                                onClick={(
                                                                                    e,
                                                                                ) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    handleReadNotification(
                                                                                        notification?.id,
                                                                                        fetchNotifications,
                                                                                    );
                                                                                }}
                                                                            >
                                                                                확인
                                                                            </Button>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        ) : (
                                            <div className="p-4 text-center text-dr-body-4 text-dr-gray-300">
                                                도착한 알림이 없습니다
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link href="/auth/login" className="">
                        <Button color="gray" classNameStyles="!py-1.5">
                            로그인
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navigation;

const NavigateLinks = ({ pathname }: NavigationLinksProps) => {
    const linkClasses = (path: string) => {
        const baseClasses =
            'text-dr-gray-100 hover:text-dr-coral-200 text-dr-body-4 hover:text-xs transition-all duration-200';
        const activeClasses =
            'text-dr-coral-200 hover:text-dr-coral-200 text-dr-body-4 hover:text-xs transition-all duration-200';
        return pathname === path ? `${activeClasses}` : baseClasses;
    };

    return (
        <div className="w-full flex justify-center items-center">
            <ul className="flex gap-8">
                <li>
                    <Link href="/" className={linkClasses('/')}>
                        홈
                    </Link>
                </li>
                <li>
                    <Link href="/group/list" className={linkClasses('/group')}>
                        스터디 그룹
                    </Link>
                </li>
                <li>
                    <Link
                        href="/moderator"
                        className={linkClasses('/moderator')}
                    >
                        AI 사회자
                    </Link>
                </li>
            </ul>
        </div>
    );
};

const ProfileDropDown = ({
    memberData,
    toggleDropdown,
    onClickSetLogout,
    profileImageBoxRef,
}: ProfileDropDownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 드롭다운 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                profileImageBoxRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !profileImageBoxRef.current.contains(event.target as Node)
            ) {
                toggleDropdown(); // 드롭다운 닫기
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggleDropdown]);

    return (
        <div
            ref={dropdownRef}
            className="absolute overflow-hidden right-0 top-[100%] bg-dr-dark-800 rounded-lg shadow-lg z-20 border text-dr-white bg-dr-dark-300 border-dr-dark-200 animate-popIn"
        >
            <div className="flex p-[1rem] gap-dr-10 border-b border-dr-gray-500">
                <MemberAvatar member={memberData} />

                <div className="flex-1 text-dr-body-3">
                    <p className="font-semibold text-dr-body-3">
                        {memberData?.nickname}
                    </p>
                    <p className="text-dr-body-4 text-dr-gray-300">
                        {memberData?.email}
                    </p>
                </div>
            </div>
            <ul className="flex flex-col text-dr-body-3">
                <li className="flex items-center cursor-pointer hover:bg-dr-dark-100">
                    <Link
                        href={`/member/${memberData.id}`}
                        className="flex items-center text-dr-gray-200 text-dr-body-4  hover:bg-dr-dark-100"
                    >
                        <Icon icon="person" size="sm" />
                        <p className="min-w-[10rem]">마이페이지</p>
                    </Link>
                </li>
                <li
                    className="flex items-center text-dr-gray-200 text-dr-body-4  hover:bg-dr-dark-100 transition-colos duration-300 cursor-pointer"
                    onClick={onClickSetLogout}
                >
                    <button className="flex items-center text-dr-gray-200 text-dr-body-4  hover:bg-dr-dark-100 transition-colos duration-300">
                        <Icon icon="logout" size="sm" />{' '}
                    </button>
                    <p className="min-w-[10rem]">로그아웃</p>
                </li>
            </ul>
        </div>
    );
};
