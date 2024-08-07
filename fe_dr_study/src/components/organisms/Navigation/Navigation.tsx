'use client';

import React, { useState, useEffect } from 'react';
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
import { GET } from '@/app/api/routeModule';
import Icon from '@/components/atoms/Icon/Icon';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

const Navigation = ({ scrollPosition }: { scrollPosition: string }) => {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();

    const isSigned = useSelector((state: RootState) => state.auth.isSigned);
    const memberData = useSelector((state: RootState) => state.member);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await GET('/v1/notifications', {
                    isAuth: true,
                    revalidateTime: 0,
                });
                setNotifications(response.data.data || []);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchNotifications();
        const intervalId = setInterval(fetchNotifications, 30000); // 30초마다 알림 데이터 가져오기

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const memberData = getSessionStorageItem('memberData');
        if (memberData) {
            dispatch(setMemberState(memberData));
            dispatch(setIsSigned(TIsSigned.T));
        } else {
            dispatch(setIsSigned(TIsSigned.F));
        }
    }, [dispatch]);

    const onClickSetLogout = async () => {
        dispatch(clearMemberState());
        dispatch(setIsSigned(TIsSigned.F));
        removeMemberData();
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        setIsNotificationOpen(false);
    };

    const toggleIsNotificationOpen = () => {
        setDropdownOpen(false);
        setIsNotificationOpen(!isNotificationOpen);
    };

    const linkClasses = (path: string) => {
        const baseClasses =
            'text-dr-gray-100 hover:text-dr-coral-200 text-dr-body-4 hover:text-xs transition-all duration-200';
        const activeClasses =
            'text-dr-coral-200 hover:text-dr-coral-200 text-dr-body-4 hover:text-xs transition-all duration-200';
        return pathname === path ? `${activeClasses}` : baseClasses;
    };

    const arrowButtonStyles =
        'rounded-full p-1 bg-dr-gray-500 text-white flex items-center justify-center hover:bg-dr-gray-400 transition-colors duration-200';

    const navBoxStyles = {
        backdropFilter:
            scrollPosition === 'top' ? 'none' : 'blur(6px) saturate(180%)',
        backgroundColor:
            scrollPosition === 'top' ? '#262627' : 'rgba(38, 38, 39, 0.5)',
        transition: 'background-color 0.3s, backdrop-filter 0.3s',
    };

    return (
        <div
            className={`NAVIGATION-BOX w-full fixed flex flex-row justify-between top-0 h-[3rem] items-center px-3`}
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
            <div className="w-full flex justify-center items-center">
                <ul className="flex gap-8">
                    <li>
                        <Link href="/" className={linkClasses('/')}>
                            홈
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/group/list"
                            className={linkClasses('/group')}
                        >
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
            <div>
                {isSigned === TIsSigned.T ? (
                    <div>
                        <div className="flex items-center content-center gap-[0.5rem]">
                            <div className="relative flex items-center">
                                <div className="relative overflow-hidden w-[2.2rem] h-[2.2rem] rounded-full cursor-pointer">
                                    <Image
                                        alt="avatar"
                                        src={memberData?.imageUrl}
                                        fill
                                        onClick={toggleDropdown}
                                        unoptimized
                                    />
                                </div>
                                {dropdownOpen && (
                                    <div className="absolute right-0 top-[100%] bg-dr-dark-800 rounded-lg shadow-lg z-20 border text-dr-white bg-dr-dark-300 border-dr-dark-200">
                                        <div className="flex p-[1rem] gap-dr-10 border-b border-dr-gray-500">
                                            <div className="relative  w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden">
                                                <Image
                                                    alt="avatar"
                                                    src={memberData?.imageUrl}
                                                    fill
                                                    onClick={toggleDropdown}
                                                />
                                            </div>
                                            <div className="flex-1 text-dr-body-3">
                                                <p className="font-semibold">
                                                    {memberData?.nickname}
                                                </p>
                                                <p className="text-dr-gray-300">
                                                    {memberData?.email}
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="flex flex-col text-dr-body-3">
                                            <li className="flex items-center cursor-pointer hover:bg-dr-dark-100">
                                                <Link
                                                    href={`/members/${memberData.id}`}
                                                    className="block text-white  hover:bg-dr-dark-100"
                                                >
                                                    <Icon
                                                        icon="person"
                                                        size="sm"
                                                    />
                                                    <p className="min-w-[10rem]">
                                                        마이페이지
                                                    </p>
                                                </Link>
                                            </li>
                                            <li className="flex items-center cursor-pointer hover:bg-dr-dark-100">
                                                <button
                                                    onClick={onClickSetLogout}
                                                    className="text-left block text-white rounded-b-lg hover:bg-dr-dark-100"
                                                >
                                                    <Icon
                                                        icon="logout"
                                                        size="sm"
                                                    />{' '}
                                                    <p className="min-w-[10rem]">
                                                        로그아웃
                                                    </p>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="relative text-dr-white bg-dr-gray-500 rounded-full cursor-pointer">
                                <div onClick={toggleIsNotificationOpen}>
                                    <Icon icon="bell" size="sm" hover="gray" />
                                    {notifications.length > 0 && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-300 text-black text-xs rounded-full flex items-center justify-center">
                                            {notifications.length}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="relative w-7 h-7">
                                {isNotificationOpen && (
                                    <div className="absolute right-0 top-[112%] rounded-lg shadow-lg z-20 border text-dr-white bg-dr-dark-300 border-dr-dark-200 ">
                                        <ul className="flex flex-col text-dr-body-3 ">
                                            {notifications.map(
                                                (notification, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex pr-[0.5rem] items-center cursor-pointer hover:bg-dr-dark-100"
                                                    >
                                                        <Link
                                                            href={`/members/${memberData.id}`}
                                                            className="block text-white  hover:bg-dr-dark-100"
                                                        >
                                                            <Icon
                                                                icon="bell"
                                                                size="sm"
                                                            />{' '}
                                                            <p className="min-w-[10rem]">
                                                                {
                                                                    notification.notificationItemType
                                                                }{' '}
                                                                알림
                                                            </p>
                                                            <Button color="gray">
                                                                입장하기
                                                            </Button>
                                                        </Link>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
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

interface InvitationNotificationItem {
    conferenceId: number;
    memberId: number;
    createdAt: string;
}
interface ApplicationNotificationItem {
    memberId: number;
    groupId: number;
    applicationStatus: 'WAITING' | 'APPROVED' | 'REJECTED';
    message: string;
    createdAt: string;
}

interface InvitationNotificationData {
    notificationItemType: 'Invitation';
    createdAt: string;
    notificationItem: InvitationNotificationItem;
}

interface ApplicationNotificationData {
    notificationItemType: 'Application';
    createdAt: string;
    notificationItem: ApplicationNotificationItem;
}

type NotificationData =
    | InvitationNotificationData
    | ApplicationNotificationData;

interface NotificationsResponse {
    message: string;
    data: NotificationData[];
}
