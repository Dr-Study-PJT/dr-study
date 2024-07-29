'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/atoms';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { ILogInReq } from '@/interfaces/members';
import { login } from '../_api/login';
import { useDispatch } from 'react-redux';
import { setMemberState } from '@/store/slices/memberSlice';
import { setIsSigned, TIsSigned } from '@/store/slices/authSlice';
import useRedirectIfLoggedIn from '@/hooks/common/useRedirectIfLoggedIn';

const loginPageStyles =
    'flex justify-center items-center w-full h-full bg-gray-800';

const loginContainerStyles =
    'w-3/5 flex bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden border-[1px] border-dr-gray-300 relative';

const loginFormContainerStyles = 'w-1/2 p-8 my-auto';

const loginImageContainerStyles = 'w-1/2 relative';

const LoginPage = () => {
    useRedirectIfLoggedIn();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<ILogInReq>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: '' }); // Clear error on input change
    };

    const onClickLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login(formData);
            const memberData = getSessionStorageItem('memberData');
            dispatch(setMemberState(memberData));
            dispatch(setIsSigned(TIsSigned.T));
        } catch (error) {
            setErrors({
                email: '이메일이 잘못되었습니다.',
                password: '비밀번호가 잘못되었습니다.',
            });
        }
    };

    return (
        <div className={loginPageStyles}>
            <div className={loginContainerStyles}>
                <div className={loginImageContainerStyles}>
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
                <div className={loginFormContainerStyles}>
                    <h2 className="text-dr-header-2 text-dr-coral-200 font-bold mb-6">
                        로그인
                    </h2>
                    <form
                        onSubmit={onClickLoginSubmit}
                        className="SECTION-INPUT-LIST flex flex-col gap-4"
                    >
                        <InputWithLabelAndError
                            label="이메일 입력"
                            type="email"
                            id="email"
                            placeholder="이메일을 입력해주세요."
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <InputWithLabelAndError
                            label="비밀번호 입력"
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력해주세요."
                            value={formData.password}
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
