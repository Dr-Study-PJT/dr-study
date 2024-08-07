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
    const member = useSelector((state: RootState) => state.member);

    const memberData = getSessionStorageItem('memberData');

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: '알림1',
        },
        {
            id: 2,
            message: '알림2',
        },
    ]);

    const onClickGetLoginMemberInfo = async () => {
        try {
            const response = await GET('v1/members', {
                isAuth: true,
            });
            return response.data;
        } catch {
            console.log('로그인사용자 정보 가져오기 실패');
        }
    };

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
                                        layout="fill"
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
                                                    layout="fill"
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
                                                    href={`/members/${member.id}`}
                                                    className="block text-white  hover:bg-dr-dark-100"
                                                ></Link>
                                                <Icon icon="person" size="sm" />{' '}
                                                <p className="min-w-[10rem]">
                                                    마이페이지
                                                </p>
                                            </li>
                                            <li className="flex items-center cursor-pointer hover:bg-dr-dark-100">
                                                <button
                                                    onClick={onClickSetLogout}
                                                    className="text-left block text-white rounded-b-lg hover:bg-dr-dark-100"
                                                ></button>
                                                <Icon icon="logout" size="sm" />{' '}
                                                <p className="min-w-[10rem]">
                                                    로그아웃
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="text-dr-white bg-dr-gray-500 rounded-full cursor-pointer">
                                <div onClick={toggleIsNotificationOpen}>
                                    <Icon icon="bell" size="sm" hover="gray" />
                                </div>
                            </div>

                            <div className="relative w-7 h-7">
                                {isNotificationOpen && (
                                    <div className="absolute right-0 top-[112%] bg-dr-dark-800 rounded-lg shadow-lg z-20 border text-dr-white bg-dr-dark-300 border-dr-dark-200 ">
                                        <ul className="flex flex-col text-dr-body-3 ">
                                            {notifications.map(
                                                (notification) => (
                                                    <li
                                                        key={notification.id}
                                                        className="flex pr-[0.5rem] items-center cursor-pointer hover:bg-dr-dark-100"
                                                    >
                                                        <Link
                                                            href={`/members/${member.id}`}
                                                            className="block text-white  hover:bg-dr-dark-100"
                                                        ></Link>
                                                        <Icon
                                                            icon="bell"
                                                            size="sm"
                                                        />{' '}
                                                        <p className="min-w-[10rem]">
                                                            {
                                                                notification.message
                                                            }
                                                        </p>
                                                        <Button color="gray">
                                                            입장하기
                                                        </Button>
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
