'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms';

const ButtonWithRouter = () => {
    const router = useRouter();

    return (
        <Button
            classNameStyles="px-8 font-semibold"
            onClick={(e) => {
                router.push('/auth/login');
            }}
        >
            로그인하고 나에게 꼭 맞는 스터디 찾기
        </Button>
    );
};

export default ButtonWithRouter;
