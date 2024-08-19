'use client';

import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { POST } from '@/app/api/routeModule';
import { Button } from '@/components/atoms';
import Icon from '@/components/atoms/Icon/Icon';
import { ClientInterface } from '@/components/template/conference/ConferenceTemplate';
import { RootState } from '@/store';
import { setAvatarDialogue } from '@/store/slices/avatarDialogueSlice';
import { setIsAvatarSpeaking } from '@/store/slices/isAvatarSpeakingSlice';
import { pushSummaryMessages } from '@/store/slices/summaryMessagesSlice';
import { setTimeForAvatarSpeaking } from '@/store/slices/timeForAvatarSpeakingSlice';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Timer } from '../ConferenceProgress/ConferenceProgress';
import ConferenceMediaSetting from '../ConferenceMediaSetting/ConferenceMediaSetting';

interface ConferenceControlBarProps {
    audioInputs: MediaDeviceInfo[];
    audioOutputs: MediaDeviceInfo[];
    videoInputs: MediaDeviceInfo[];
    subscriptionList: string[];
    client: ClientInterface;
    stompClient: any;
    localStream: MediaStream | null;
    existingPeers: Record<string, MediaStream>;
    setExistingPeers: Dispatch<SetStateAction<Record<string, MediaStream>>>;
    conferenceId: number;
}

const ConferenceControlBar = ({
    audioInputs,
    audioOutputs,
    videoInputs,
    subscriptionList,
    client,
    stompClient,
    localStream,
    existingPeers,
    setExistingPeers,
    conferenceId,
}: ConferenceControlBarProps) => {
    const router = useRouter();

    const isMutedBySystem = useSelector(
        (state: RootState) => state.isMutedBySystem.isMutedBySystem,
    );

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
        try {
            // 연결 종료
            stompClient.disconnect(() => {
                console.log('연결 종료');
            });
        } catch (error) {
            console.error('컨퍼런스 나가기 실패:', error);
        } finally {
            router.push(`/`);
        }
    };

    // const dispatch = useDispatch();

    // const handleClickStartSpeaking = (boolean: boolean) =>
    //     dispatch(setIsAvatarSpeaking(boolean));

    // const handleClickAddDialogue = (message: string) =>
    //     dispatch(setAvatarDialogue(message));

    // const handleClickAddSummary = (message: {}) =>
    //     dispatch(pushSummaryMessages(message));

    const handleClickToggleMediaSetting = () => {
        setIsVisibleMediaSetting((prev) => !prev);
    };

    const [isVisibleMediaSetting, setIsVisibleMediaSetting] =
        useState<boolean>(false);

    return (
        <div className="relative z-50 flex justify-center bg-[#191B28]  gap-dr-10 h-full border-t-[1px] border-dr-indigo-0">
            {isVisibleMediaSetting && (
                <div className="absolute top-[-500%] left-[50%] w-[70%] h-[600%] bg-[#191B28] z-[500] text-dr-white transform translate-x-[-50%] translate-y-[-50%]">
                    <ConferenceMediaSetting
                        audioInputs={audioInputs}
                        videoInputs={videoInputs}
                        audioOutputs={audioOutputs}
                        localStream={localStream}
                        existingPeers={existingPeers}
                        client={client}
                        handleClickToggleMediaSetting={
                            handleClickToggleMediaSetting
                        }
                    />
                </div>
            )}
            <Timer />
            {/* <Button onClick={() => handleClickStartSpeaking(true)}>
                isAvatarSpeaking True
            </Button>
            <Button onClick={() => handleClickStartSpeaking(false)}>
                isAvatarSpeaking False
            </Button>
            <Button onClick={() => handleClickAddDialogue('')}>
                handleClickAddDialogue
            </Button>
            <Button
                onClick={() =>
                    handleClickAddDialogue(
                        '메시지입니다. 메시지입니다. 메시지입니다. 메시지입니다. 메시지입니다.',
                    )
                }
            >
                handleClickAddDialogue
            </Button>
            <Button
                onClick={() => handleClickAddSummary({ message: '요약 추가.' })}
            >
                handleClickAddSummary
            </Button> */}

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
            <button
                className="cursor-auto"
                onClick={handleClickToggleMediaSetting}
            >
                {
                    <Icon
                        cursor="pointer"
                        size="md"
                        hover="blue"
                        bg="gray"
                        text="white"
                        icon="gear"
                    />
                }
            </button>
        </div>
    );
};

export default ConferenceControlBar;
