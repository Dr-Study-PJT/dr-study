'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
import { useQueryClient } from '@tanstack/react-query';
import {
    NavigationLinksProps,
    NotificationData,
    ProfileDropDownProps,
} from './Navigation.types';
import Tooltip from '../SideBar/Tooltip';

const Navigation = ({ scrollPosition }: { scrollPosition: string }) => {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();

    const isSigned = useSelector((state: RootState) => state.auth.isSigned);
    const memberData = useSelector((state: RootState) => state.member);

    const profileImageBoxRef = useRef<HTMLDivElement>(null);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    const queryClient = useQueryClient();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await GET('v1/notifications', {
                    isAuth: true,
                    revalidateTime: 0,
                });
                console.log('GET 알림 데이터 : ', response.data.data);
                setNotifications(response.data.notificaitonItem || []);
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
        removeMemberData();
        dispatch(clearMemberState());
        dispatch(setIsSigned(TIsSigned.F));
        queryClient.removeQueries({ queryKey: ['memberData'] });
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        setIsNotificationOpen(false);

        if (dropdownOpen) {
            setDropdownOpen(false);
        }
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
                                        className="relative hover:w-[2.1rem] hover:h-[2.1rem] transition-all duration-300 w-[2rem] h-[2rem] animate-popIn overflow-hidden cursor-pointer"
                                    >
                                        <Image
                                            onClick={toggleDropdown}
                                            className="rounded-[10rem] border-2 border-dr-white hover:border-dr-gray-100 transition-all duration-300"
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
                            <div className="relative text-dr-white rounded-full cursor-pointer">
                                <Tooltip text={'알림'} direction="top">
                                    <div onClick={toggleIsNotificationOpen}>
                                        <Icon
                                            icon="bell"
                                            size="sm"
                                            hover="gray"
                                            text="gray"
                                        />
                                        {notifications.length > 0 && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-300 text-black text-xs rounded-full flex items-center justify-center">
                                                {notifications.length}
                                            </div>
                                        )}
                                    </div>
                                </Tooltip>
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
    }, []);

    return (
        <div
            ref={dropdownRef}
            className="absolute  overflow-hidden right-0 top-[100%] bg-dr-dark-800 rounded-lg shadow-lg z-20 border text-dr-white bg-dr-dark-300 border-dr-dark-200"
        >
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
                    <p className="font-semibold">{memberData?.nickname}</p>
                    <p className="text-dr-gray-300">{memberData?.email}</p>
                </div>
            </div>
            <ul className="flex flex-col text-dr-body-3">
                <li className="flex items-center cursor-pointer hover:bg-dr-dark-100">
                    <Link
                        href={`/members/${memberData.id}`}
                        className="flex items-center text-white  hover:bg-dr-dark-100"
                    >
                        <Icon icon="person" size="sm" />
                        <p className="min-w-[10rem]">마이페이지</p>
                    </Link>
                </li>
                <li
                    className="flex items-center cursor-pointer hover:bg-dr-dark-100"
                    onClick={onClickSetLogout}
                >
                    <button className="text-left block text-white rounded-b-lg hover:bg-dr-dark-100">
                        <Icon icon="logout" size="sm" />{' '}
                    </button>
                    <p className="min-w-[10rem]">로그아웃</p>
                </li>
            </ul>
        </div>
    );
};
