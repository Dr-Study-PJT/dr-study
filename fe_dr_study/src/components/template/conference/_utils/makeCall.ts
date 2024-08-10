import Peer from 'peerjs';
import { Dispatch, SetStateAction } from 'react';

interface MakeCall {
    isPeerCreateExecuted: boolean;
    remotePeerId: string;
    myPeer: Peer | null;
    localStream: MediaStream | null;
    setExistingPeers: Dispatch<SetStateAction<Record<string, MediaStream>>>;
}

export const makeCall = async ({
    isPeerCreateExecuted,
    remotePeerId,
    myPeer,
    localStream,
    setExistingPeers,
}: MakeCall) => {
    if (!isPeerCreateExecuted) return;

    if (remotePeerId) {
        const myCall = myPeer?.call(
            remotePeerId, // 호출할 Peer ID에
            localStream as MediaStream, // 로컬 스트림 전달
        );
        // 스트림 수신 이벤트 처리
        myCall?.on('stream', (stream) => {
            console.log('스트림 수신 이벤트 처리, stream => ', stream);
            setExistingPeers((prevPeers) => ({
                ...prevPeers,
                [remotePeerId]: stream, // 수신된 스트림을 기존 Peers에 추가
            }));
        });
    }
    console.log('remotePeer에 전화 연결하기, remotePeerId => ', remotePeerId);
};
