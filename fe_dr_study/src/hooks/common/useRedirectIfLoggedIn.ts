'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const useRedirectIfLoggedIn = () => {
    const router = useRouter();
    const isSigned = useSelector((state: RootState) => state.auth.isSigned);

    useEffect(() => {
        if (isSigned === 'T') {
            router.push('/');
        }
    }, [isSigned, router]);
};

export default useRedirectIfLoggedIn;
