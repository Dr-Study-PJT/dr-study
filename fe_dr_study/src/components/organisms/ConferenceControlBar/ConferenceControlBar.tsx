'use client';

import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { POST } from '@/app/api/routeModule';
import Icon from '@/components/atoms/Icon/Icon';
import ToolTip from '@/components/atoms/Tooltip/ToolTip';
import { ClientInterface } from '@/components/template/conference/ConferenceTemplate';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

interface ConferenceControlBarProps {
    subscriptionList: string[];
    client: ClientInterface;
    stompClient: any;
    localStream: MediaStream | null;
    existingPeers: Record<string, MediaStream>;
    setExistingPeers: Dispatch<SetStateAction<Record<string, MediaStream>>>;
    isMutedBySystem: boolean;
    conferenceId: number;
}

const ConferenceControlBar = ({
    subscriptionList,
    client,
    stompClient,
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
        // 모든 구독 해제
        subscriptionList.forEach((sub) => {
            stompClient.unsubscribe(sub);
        });

        // 연결 종료
        stompClient.disconnect(() => {
            console.log('모든 구독 해제 및 연결 종료');
        });

        try {
            const response = await POST({
                API: API,
                endPoint: `${conferenceId}/quit`,
                body: {},
                isAuth: true,
            });
            console.log('컨퍼런스 나가기 성공:', response);
            router.push(`/`);
        } catch (error) {
            console.error('컨퍼런스 나가기 실패:', error);
        }
    };

    return (
        <div className="flex justify-center bg-dr-dark-200  gap-dr-10 h-full">
            <button className="cursor-auto" onClick={toggleVideo}>
                {videoEnabled ? (
                    <Icon
                        cursor="pointer"
                        size="md"
                        hover="blue"
                        bg="blue"
                        text="white"
                        icon="videoOn"
                    />
                ) : (
                    <Icon
                        cursor="pointer"
                        size="md"
                        hover="blue"
                        bg="blue"
                        text="white"
                        icon="videoOff"
                    />
                )}
            </button>
            <button onClick={toggleAudio} className="relative group">
                {audioEnabled ? (
                    <>
                        {/* <ToolTip
                            isVisible={isMutedBySystem}
                            content="시스템에 의해 제어할 수 없는 상태입니다."
                        /> */}
                        {isMutedBySystem && (
                            <span className="tooltip-text absolute hidden group-hover:block bg-black text-white text-xs rounded py-1 px-3 -mt-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                시스템에 의해 제어할 수 없는 상태입니다.
                            </span>
                        )}
                        <Icon
                            cursor="pointer"
                            disabled={isMutedBySystem}
                            size="md"
                            hover="blue"
                            bg="blue"
                            text="white"
                            icon={isMutedBySystem ? 'micOff' : 'micOn'}
                        />
                    </>
                ) : (
                    <Icon
                        cursor="pointer"
                        size="md"
                        hover="blue"
                        bg="blue"
                        text="white"
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
                    size="md"
                />
            </button>
        </div>
    );
};

export default ConferenceControlBar;
