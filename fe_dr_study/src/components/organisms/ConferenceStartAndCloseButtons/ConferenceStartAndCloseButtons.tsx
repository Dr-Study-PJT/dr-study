'use client';

import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { POST } from '@/app/api/routeModule';
import { Button } from '@/components/atoms';
import { ConferenceData } from '@/interfaces/conference';
import { showToast } from '@/utils/toastUtil';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

const ConferenceStartAndCloseButtons = ({
    conferenceInfo,
    // handleCloseSignal,
}: {
    conferenceInfo: ConferenceData | null;
    // handleCloseSignal: () => void;
}) => {
    const router = useRouter();

    // 컨퍼런스 룸 시작 함수
    const startConference = async () => {
        const confirmStart = confirm('컨퍼런스를 시작하시겠습니까?');
        if (!confirmStart) return;

        try {
            const response = await POST({
                API: API,
                endPoint: `${conferenceInfo?.id}/start`,
                body: '',
                isAuth: true,
            });
        } catch (error) {
            console.error('Error start conference list:', error);
        }
    };

    const closeConference = async () => {
        const confirmClose = confirm('컨퍼런스를 종료하시겠습니까?');
        if (!confirmClose) return;

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

    return (
        <div className="flex flex-col gap-dr-5">
            <ToastContainer />
            <Button fullWidth onClick={startConference}>
                컨퍼런스 시작
            </Button>
            <Button fullWidth onClick={closeConference}>
                컨퍼런스 종료
            </Button>
        </div>
    );
};

export default ConferenceStartAndCloseButtons;
