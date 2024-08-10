import Peer from 'peerjs';
import { Dispatch, SetStateAction } from 'react';

interface OpenPeerProps {
    myPeer: Peer;
    setMyPeerId: Dispatch<SetStateAction<string>>;
    setIsPeerCreated: Dispatch<SetStateAction<boolean>>;
}

interface CallStreamProps {
    myPeer: Peer;
    setExistingPeers: Dispatch<SetStateAction<Record<string, MediaStream>>>;
}

export const openPeer = ({
    myPeer,
    setMyPeerId,
    setIsPeerCreated,
}: OpenPeerProps) => {
    myPeer.on('open', (id) => {
        console.log(`2. 피어 오픈됨, 피어아이디->${id}`);
        setMyPeerId(id);
        setIsPeerCreated(true);
    });
};

export const callStream = ({ myPeer, setExistingPeers }: CallStreamProps) => {
    myPeer.on('call', (call) => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            ?.then((stream) => {
                call.answer(stream); // Answer the call with an A/V stream.
                call.on('stream', (remoteStream: MediaStream) => {
                    setExistingPeers((prevPeers) => ({
                        ...prevPeers,
                        [remoteStream.id]: remoteStream, // 수신된 스트림을 기존 Peers에 추가
                    }));
                });
            });
    });
};
