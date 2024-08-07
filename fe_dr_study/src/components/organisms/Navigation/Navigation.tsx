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
                        <div className="flex items-center">
                            <div className="relative">
                                <div className="relative overflow-hidden w-7 h-7 rounded-full cursor-pointer">
                                    <Image
                                        alt="avatar"
                                        src={memberData?.imageUrl}
                                        layout="fill"
                                        onClick={toggleDropdown}
                                    />
                                </div>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                                        <Button
                                            onClick={onClickGetLoginMemberInfo}
                                        >
                                            내정보갱신
                                        </Button>
                                        <Link
                                            href={`/members/${member.id}`}
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        >
                                            마이페이지
                                        </Link>
                                        <button
                                            onClick={onClickSetLogout}
                                            className="text-left block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        >
                                            로그아웃
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div
                                className="relative"
                                onClick={toggleIsNotificationOpen}
                            >
                                <Icon icon="send" size="sm" />
                                {isNotificationOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                                        <ul>
                                            {notifications.map(
                                                (notification) => (
                                                    <li
                                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                                        key={notification.id}
                                                    >
                                                        {notification.message}
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
