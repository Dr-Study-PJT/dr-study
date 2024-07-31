'use client';

import { Button, Paragraph, Span } from '@/components/atoms';
import Peer from 'peerjs';
import React, { useEffect, useState } from 'react';

interface RoomProps {
    myPeer: Peer | null;
    localStream: MediaStream | null;
    myPeerId: string;
    initialPeers: Record<string, MediaStream>;
    initialPeerIds: string[];
}

const Room = ({
    myPeer,
    myPeerId,
    localStream,
    initialPeers,
    initialPeerIds,
}: RoomProps) => {
    const [connectedPeers, setConnectedPeers] =
        useState<Record<string, MediaStream>>(initialPeers);

    const [videoEnabled, setVideoEnabled] = useState(true); // 비디오 상태
    const [audioEnabled, setAudioEnabled] = useState(true); // 오디오 상태

    // console.log(myPeer, 'myPeer');
    // console.log(myPeerId, 'myPeerId');
    // console.log(localStream, 'localStream');
    // console.log(initialPeers, 'initialPeers');
    // console.log(connectedPeers, 'connectedPeers');
    // Object.keys(connectedPeers).forEach((peer) => {
    //     console.log(peer, 'eachPeer');
    // });

    // 초기 스트림 peer 설정
    useEffect(() => {
        setConnectedPeers(initialPeers);
    }, [initialPeers]);

    // 통화 종료 기능
    const disconnectCall = (peerId: string) => {
        if (connectedPeers[peerId]) {
            // 연결된 사용자 스트림 종료
            const peer = connectedPeers[peerId];
            peer.getTracks().forEach((track) => track.stop());

            // 연결된 사용자 목록에서 제거
            setConnectedPeers((prevPeers) => {
                const updatedPeers = { ...prevPeers };
                delete updatedPeers[peerId];
                return updatedPeers;
            });
        }
    };

    // 비디오 토글 핸들러
    const toggleVideo = () => {
        console.log('toggleVideo: 클릭', localStream?.getAudioTracks());
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
        Object.keys(connectedPeers).forEach((peerId) => disconnectCall(peerId));
        // (home 같은 경로로 주소 이동)
    };
    useEffect(() => {
        console.log(connectedPeers);
    }, [connectedPeers]);

    return (
        <div className="video-container">
            <h2 className="text-dr-header-2">내 스트림</h2>
            <Paragraph>내 Peer Id : {myPeerId}</Paragraph>

            <div className="controls">
                <Button onClick={toggleVideo}>
                    {videoEnabled ? 'Turn Off Video' : 'Turn On Video'}
                </Button>
                <Button onClick={toggleAudio}>
                    {audioEnabled ? 'Mute' : 'Unmute'}
                </Button>
                <Button onClick={handleDisconnectAll}>Disconnect All</Button>
            </div>

            <div key={myPeerId} className="video-item">
                <h3>User: {myPeerId}</h3>
                <video
                    ref={(el) => {
                        if (el) {
                            el.srcObject = localStream;
                            el.play();
                        }
                    }}
                    autoPlay
                    muted
                    style={{ width: '300px', height: '200px' }}
                ></video>
            </div>

            {Object.keys(connectedPeers).map(
                (peerId) =>
                    peerId !== '' && (
                        <div key={peerId} className="video-item">
                            <h3>User: {peerId}</h3>
                            <video
                                ref={(el) => {
                                    if (el) {
                                        el.srcObject = connectedPeers[peerId];
                                        el.play();
                                    }
                                }}
                                autoPlay
                                muted
                                style={{ width: '300px', height: '200px' }}
                            ></video>
                        </div>
                    ),
            )}
        </div>
    );
};

export default Room;
