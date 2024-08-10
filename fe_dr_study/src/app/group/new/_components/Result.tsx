'use client';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import loadingAnimation from '@/app/assets/lotties/loading.json';
import successAnimation from '@/app/assets/lotties/success.json';
import warningAnimation from '@/app/assets/lotties/warning.json';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import { Button } from '@/components/atoms';
import { useRouter } from 'next/navigation';

export const LoadingLottie = () => {
    return (
        <Lottie
            style={{ width: '100%', height: '12rem' }}
            animationData={loadingAnimation}
            loop={true}
        />
    );
};

export const SuccessLottie = () => {
    return (
        <Lottie
            style={{ width: '100%', height: '12rem' }}
            animationData={successAnimation}
            loop={false}
        />
    );
};

export const FailLottie = () => {
    return (
        <Lottie
            style={{ width: '100%', height: '12rem' }}
            animationData={warningAnimation}
            loop={false}
        />
    );
};

interface ResultStepProps {
    loading: boolean;
    result?: {
        id: number | null;
        success: boolean | null;
        description: string;
    };
    successMessage: string;
    failMessage: string;
    onHomeClick: () => void;
    onSuccessConfirmClick?: () => void;
    onFailureEditClick: () => void;
}

const ResultStep = ({
    loading,
    result = { id: null, success: null, description: '' },
    successMessage,
    failMessage,
    onHomeClick,
    onSuccessConfirmClick,
    onFailureEditClick,
}: ResultStepProps) => {
    const [displayLoading, setDisplayLoading] = useState(true);
    const [dots, setDots] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (loading) {
            setDisplayLoading(true);
            const timer = setTimeout(() => setDisplayLoading(false), 2000);
            return () => clearTimeout(timer);
        } else {
            setDisplayLoading(false);
        }
    }, [loading]);

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
            }, 500);
            return () => clearInterval(interval);
        } else {
            setDots('');
        }
    }, [loading]);

    if (displayLoading && loading) {
        return (
            <div className="w-full h-full flex flex-col items-center">
                <LoadingLottie />
                <div className="TITLE-TEXT text-dr-header-2 font-bold w-full text-center">
                    {`처리 중${dots}`}
                </div>
            </div>
        );
    }

    if (!loading && result.success === true) {
        return (
            <div className="w-full h-full flex flex-col items-center">
                <SuccessLottie />
                <div className="TITLE-TEXT text-dr-header-2 font-bold w-full text-center">
                    {successMessage}
                </div>
                <div className="w-1/2 mt-5">
                    <TextareaWithLabel
                        className=""
                        label="처리 결과"
                        value={result.description}
                        disabled
                    />
                    <div className="w-full flex justify-center gap-4 mt-5">
                        <Button
                            rounded
                            onClick={onHomeClick}
                            color="gray"
                            fullWidth
                        >
                            홈으로
                        </Button>
                        <Button
                            rounded
                            onClick={(e) => {
                                router.push(`/group/${result.id}`);
                            }}
                            fullWidth
                        >
                            그룹 보러가기
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!loading && result.success === false) {
        return (
            <div className="w-full h-full flex flex-col items-center">
                <FailLottie />
                <div className="TITLE-TEXT text-dr-header-2 font-bold w-full text-center">
                    {failMessage}
                </div>
                <div className="w-1/2 mt-5">
                    <TextareaWithLabel
                        label="설명"
                        disabled
                        value={result.description}
                        textareaSize="lg"
                    />

                    <div className="w-full flex justify-center gap-4 mt-5">
                        <Button
                            rounded
                            onClick={onHomeClick}
                            color="gray"
                            fullWidth
                        >
                            홈으로
                        </Button>
                        <Button
                            rounded
                            onClick={onFailureEditClick}
                            fullWidth
                            color="red"
                        >
                            수정하기
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default ResultStep;
