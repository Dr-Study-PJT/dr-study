import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // usePathname 훅 사용
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

const Navigation = () => {
    const pathname = usePathname(); // usePathname 훅 사용
    const dispatch = useDispatch();
    const isSigned = useSelector((state: RootState) => state.auth.isSigned);
    const member = useSelector((state: RootState) => state.member);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const memberData = getSessionStorageItem('memberData');
        if (memberData) {
            dispatch(setMemberState(memberData));
        }
    }, [dispatch]);

    const onClickSetLogout = async () => {
        dispatch(clearMemberState());
        dispatch(setIsSigned(TIsSigned.F));
        removeMemberData();
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const linkClasses = (path: string) => {
        const baseClasses =
            'text-dr-gray-100 hover:text-dr-coral-200 text-dr-body-4 hover:text-xs transition-all duration-200';
        const activeClasses =
            'text-dr-coral-200 hover:text-dr-coral-200 text-dr-body-4 hover:text-xs transition-all duration-200';
        return pathname === path ? `${activeClasses}` : baseClasses;
    };

    return (
        <div className="NAVIGATION-BOX w-full fixed flex flex-row justify-between bg-[#262627] top-0 h-[3rem] items-center px-4">
            <div>
                <Logo />
            </div>
            <div className="w-full flex justify-center items-center">
                <ul className="flex gap-8">
                    <li>
                        <Link
                            href="/conference/1"
                            className={linkClasses('/home')}
                        >
                            컨퍼런스참여
                        </Link>
                    </li>
                    <li>
                        <Link href="/home" className={linkClasses('/home')}>
                            홈
                        </Link>
                    </li>
                    <li>
                        <Link href="/group" className={linkClasses('/group')}>
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
                    <li>
                        <Link href="/board" className={linkClasses('/board')}>
                            게시판
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                {isSigned === TIsSigned.T ? (
                    <div className="relative">
                        <img
                            src="/path/to/profile-image.jpg"
                            alt="Profile"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={toggleDropdown}
                        />
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                                <Link
                                    href="/mypage"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    마이페이지
                                </Link>
                                <Link
                                    href="/my-study-groups"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    내 스터디그룹
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
                ) : (
                    <Link href="/auth/login" className="">
                        <Button color="gray">로그인</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navigation;
