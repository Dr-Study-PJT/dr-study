'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { Member } from '../[group_id]/_types';

const ButtonWithRouter = () => {
    const [sessionMemberData, setSessionMemberData] = useState<Member | null>(
        null,
    );
    const [buttonVisible, setButtonVisible] = useState(true);

    const router = useRouter();
    const memberData = useSelector((state: RootState) => state.member);

    useEffect(() => {
        const data = getSessionStorageItem('memberData');
        setSessionMemberData(data);
    }, [memberData]);

    const isLoggedIn = Boolean(memberData?.id || sessionMemberData?.id);

    const handleClick = () => {
        if (isLoggedIn) {
            setButtonVisible(false);
        } else {
            router.push('/auth/login');
        }
    };

    if (!buttonVisible) {
        return null;
    }

    return (
        <Button
            classNameStyles={`px-8 font-semibold animate-popIn ${isLoggedIn ? 'hidden' : 'block'}`}
            onClick={handleClick}
        >
            로그인하고 나에게 꼭 맞는 스터디 찾기
        </Button>
    );
};

export default ButtonWithRouter;
