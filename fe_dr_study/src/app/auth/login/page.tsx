'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { ILogInReq } from '@/interfaces/members';
import { login } from '../_api/login';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setMemberState } from '@/store/slices/memberSlice';
import { TIsSigned, setIsSigned } from '@/store/slices/authSlice';
import path from 'path';
import { showToast } from '@/utils/toastUtil';
import { getSessionStorageItem } from '@/utils/sessionStorage';

interface ILoginPageProps {
    searchParams: { error: string };
}

const LoginPage = ({ searchParams }: ILoginPageProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formData, setFormData] = useState<ILogInReq>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const queryClient = useQueryClient();

    // 로그인 후 memberData를 저장할 상태
    const { data: memberData, refetch } = useQuery({
        queryKey: ['memberData'],
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: '' }); // Clear error on input change
    };

    // useMutation을 사용하여 로그인 요청 처리
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            // 로그인 성공 후 memberData를 'memberData' 키에 저장
            console.log('query success =>', data);
            setIsLoggedIn(true);
            queryClient.setQueryData(['memberData'], data.data.memberInfo);
            dispatch(setMemberState(data.data.memberInfo));
            dispatch(setIsSigned(TIsSigned.T));

            router.push('/'); // 로그인 후 홈으로 이동
        },
        onError: (error: any) => {
            console.log('에러:' + error);
            setErrors({
                email: '이메일이 잘못되었습니다.',
                password: '비밀번호가 잘못되었습니다.',
            });
        },
    });

    const onClickLoginSubmit = (e: FormEvent) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    };

    const sessionMemberData = getSessionStorageItem('memberData');

    useEffect(() => {
        if (sessionMemberData) {
            router.push('/');
        }

        const timeout = setTimeout(() => {
            if (searchParams.error === 'access_error') {
                showToast('error', '로그인이 필요한 서비스입니다.');
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [isLoggedIn, router]);

    return (
        <div className="flex justify-center items-center w-full h-full bg-gray-800">
            <div className="w-3/5 flex bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden border-[1px] border-dr-gray-300 relative">
                <div className="w-1/2 relative">
                    <Image
                        src="/images/login_thumbnail.png"
                        width={526}
                        height={652}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                        <h2 className="text-dr-header-3 font-bold mb-2">
                            Dr. Study에 로그인
                        </h2>
                        <p className="text-dr-body-4 font-bold text-dr-coral-300">
                            닥터스터디에 로그인해주세요.
                        </p>
                    </div>
                </div>
                <div className="w-1/2 p-8 my-auto">
                    <h2 className="text-dr-header-2 text-dr-coral-200 font-bold mb-6">
                        로그인
                    </h2>
                    <form
                        onSubmit={onClickLoginSubmit}
                        className="flex flex-col gap-4"
                    >
                        <InputWithLabelAndError
                            label="이메일 입력"
                            type="email"
                            id="email"
                            placeholder="이메일을 입력해주세요."
                            value={formData?.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <InputWithLabelAndError
                            label="비밀번호 입력"
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력해주세요."
                            value={formData?.password}
                            onChange={handleChange}
                            error={errors.password}
                        />

                        <Button fullWidth type="submit">
                            로그인
                        </Button>
                    </form>
                    <div className="mt-4 w-full flex justify-end">
                        <Link
                            href="/auth/register"
                            className="text-dr-coral-100 hover:underline text-dr-body-4"
                        >
                            회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
