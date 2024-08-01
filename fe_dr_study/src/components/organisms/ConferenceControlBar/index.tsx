'use client';

import { Button } from '@/components/atoms';
import Icon from '@/components/atoms/Icon/Icon';
import Peer from 'peerjs';
import { Dispatch, SetStateAction, useState } from 'react';

interface ConferenceControlBarProps {
    localStream: MediaStream | null;
    existingPeers: Record<string, MediaStream>;
    setExistingPeers: Dispatch<SetStateAction<Record<string, MediaStream>>>;
}

const ConferenceControlBar = ({
    localStream,
    existingPeers,
    setExistingPeers,
}: ConferenceControlBarProps) => {
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
        if (localStream) {
            localStream.getAudioTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
            setAudioEnabled((prev) => !prev);
        }
    };

    const handleDisconnectAll = () => {
        // 모든 연결된 사용자와의 통화 종료
        Object.keys(existingPeers).forEach((peerId) => disconnectCall(peerId));
        // (home 같은 경로로 주소 이동)
    };

    return (
        <div className="flex justify-center bg-dr-dark-300 p-2 gap-dr-10">
            <button onClick={toggleVideo}>
                {videoEnabled ? (
                    <Icon size="sm" icon="videoOn" />
                ) : (
                    <Icon size="sm" icon="videoOff" />
                )}
            </button>
            <button onClick={toggleAudio}>
                {audioEnabled ? (
                    <Icon className="bg-dr-white" size="sm" icon="micOn" />
                ) : (
                    <Icon className="bg-dr-white" size="sm" icon="micOff" />
                )}
            </button>
            <button onClick={handleDisconnectAll}>
                <Icon icon="phoneCall" size="sm" />
            </button>
        </div>
    );
};

export default ConferenceControlBar;
