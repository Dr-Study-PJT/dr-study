'use client';

import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { POST } from '@/app/api/routeModule';
import { Button } from '@/components/atoms';
import { ConferenceData } from '@/interfaces/conference';
import { showToast } from '@/utils/toastUtil';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

const ConferenceStartAndCloseButtons = ({
    conferenceInfo,
}: {
    conferenceInfo: ConferenceData | null;
}) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalAction, setModalAction] = useState<'start' | 'close'>('start');

    const startConference = async () => {
        try {
            const response = await POST({
                API: API,
                endPoint: `${conferenceInfo?.id}/start`,
                body: '',
                isAuth: true,
            });
            console.log('conference start 요청 성공:', response);
        } catch (error) {
            console.error('Error start conference list:', error);
        }
    };

    const closeConference = async () => {
        try {
            const response = await POST({
                API: API,
                endPoint: `${conferenceInfo?.id}/close`,
                body: '',
                isAuth: true,
            });

            console.log('conference close 요청 성공:', response);
        } catch (error) {
            console.error('Error close conference list:', error);
            showToast('error', '컨퍼런스 종료에 실패했습니다.');
        }
    };

    const handleModalConfirm = () => {
        if (modalAction === 'start') {
            startConference();
        } else if (modalAction === 'close') {
            closeConference();
        }
        setIsModalOpen(false);
    };

    const handleStartClick = () => {
        setModalAction('start');
        setIsModalOpen(true);
    };

    const handleCloseClick = () => {
        setModalAction('close');
        setIsModalOpen(true);
    };

    return (
        <div className="flex gap-dr-5">
            <ToastContainer />
            <Button fullWidth onClick={handleStartClick}>
                스터디 시작
            </Button>
            <Button fullWidth onClick={handleCloseClick}>
                스터디 종료
            </Button>
            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleModalConfirm}
                title={
                    modalAction === 'start' ? '컨퍼런스 시작' : '컨퍼런스 종료'
                }
                description={
                    modalAction === 'start'
                        ? '컨퍼런스를 시작하시겠습니까?'
                        : '컨퍼런스를 종료하시겠습니까?'
                }
            />
        </div>
    );
};

export default ConferenceStartAndCloseButtons;

// ========
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

export const CustomModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-dr-indigo-100 rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                <h2 className="text-xl text-slate-100 font-semibold mb-4">
                    {title}
                </h2>
                <p className="text-slate-400 text-dr-body-3 mb-6">
                    {description}
                </p>
                <div className="flex justify-end gap-4">
                    <Button onClick={onClose} color="gray">
                        취소
                    </Button>
                    <Button onClick={onConfirm}>확인</Button>
                </div>
            </div>
        </div>
    );
};
