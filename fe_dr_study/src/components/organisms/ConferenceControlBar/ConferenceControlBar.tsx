'use client';

import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { POST } from '@/app/api/routeModule';
import Icon from '@/components/atoms/Icon/Icon';
import ToolTip from '@/components/atoms/Tooltip/ToolTip';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

interface ConferenceControlBarProps {
    localStream: MediaStream | null;
    existingPeers: Record<string, MediaStream>;
    setExistingPeers: Dispatch<SetStateAction<Record<string, MediaStream>>>;
    isMutedBySystem: boolean;
    conferenceId: number;
}

const ConferenceControlBar = ({
    localStream,
    existingPeers,
    setExistingPeers,
    isMutedBySystem,
    conferenceId,
}: ConferenceControlBarProps) => {
    const router = useRouter();

    const [videoEnabled, setVideoEnabled] = useState(true); // 비디오 상태
    const [audioEnabled, setAudioEnabled] = useState(true); // 오디오 상태

    // 통화 종료 기능
    const disconnectCall = (peerId: string) => {
        if (existingPeers[peerId]) {
            // 연결된 사용자 스트림 종료
            const peer = existingPeers[peerId];
            peer.getTracks().forEach((track) => track.stop());

            // 연결된 사용자 목록에서 제거
            setExistingPeers((prevPeers) => {
                const updatedPeers = { ...prevPeers };
                delete updatedPeers[peerId];
                return updatedPeers;
            });
        }
    };

    // 비디오 토글 핸들러
    const toggleVideo = () => {
        console.log('toggleVideo: 클릭');
        if (localStream) {
            localStream.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
            setVideoEnabled((prev) => !prev);
        }
    };

    // 오디오 토글 핸들러
    const toggleAudio = () => {
        if (!isMutedBySystem && localStream) {
            localStream.getAudioTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
            setAudioEnabled((prev) => !prev);
        }
    };

    const handleDisconnectAll = async () => {
        // 모든 연결된 사용자와의 통화 종료
        Object.keys(existingPeers).forEach((peerId) => disconnectCall(peerId));
        // (home 같은 경로로 주소 이동)
        try {
            const response = await POST({
                API: API,
                endPoint: `${conferenceId}/finish`,
                body: '',
                isAuth: true,
            });
            console.log('컨퍼런스 종료 성공:', response);
            router.push(`/conference/${conferenceId}/info`);
        } catch (error) {
            console.error('컨퍼런스 종료 실패:', error);
        }
    };

    return (
        <div className="flex justify-center bg-dr-dark-200  gap-dr-10 h-full">
            <button className="cursor-auto" onClick={toggleVideo}>
                {videoEnabled ? (
                    <Icon
                        cursor="pointer"
                        size="sm"
                        hover="gray"
                        bg="gray"
                        text="blue"
                        icon="videoOn"
                    />
                ) : (
                    <Icon
                        cursor="pointer"
                        size="sm"
                        hover="gray"
                        bg="gray"
                        text="blue"
                        icon="videoOff"
                    />
                )}
            </button>
            <button onClick={toggleAudio} className="relative group">
                {audioEnabled ? (
                    <>
                        <ToolTip
                            isVisible={isMutedBySystem}
                            content="시스템에 의해 제어할 수 없는 상태입니다."
                        />
                        {/* {isMutedBySystem && (
                            <span className="tooltip-text absolute hidden group-hover:block bg-black text-white text-xs rounded py-1 px-3 -mt-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                시스템에 의해 제어할 수 없는 상태입니다.
                            </span>
                        )} */}
                        <Icon
                            cursor="pointer"
                            disabled={isMutedBySystem}
                            size="sm"
                            hover="gray"
                            bg="gray"
                            text="blue"
                            icon={isMutedBySystem ? 'micOff' : 'micOn'}
                        />
                    </>
                ) : (
                    <Icon
                        cursor="pointer"
                        size="sm"
                        hover="gray"
                        bg="gray"
                        text="blue"
                        icon="micOff"
                    />
                )}
            </button>

            <button className="cursor-auto" onClick={handleDisconnectAll}>
                <Icon
                    cursor="pointer"
                    icon="phoneCall"
                    text="white"
                    bg="red"
                    size="sm"
                />
            </button>
        </div>
    );
};

export default ConferenceControlBar;
