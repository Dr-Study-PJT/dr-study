import { Dispatch, SetStateAction } from 'react';

interface CreateStreamProps {
    localStream: MediaStream;
    setExistingPeers: Dispatch<SetStateAction<Record<string, MediaStream>>>;
    setIsLocalStreamMade: Dispatch<SetStateAction<boolean>>;
    myPeerId: string;
}

export const createStream = ({
    localStream,
    setExistingPeers,
    setIsLocalStreamMade,
    myPeerId,
}: CreateStreamProps) => {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
            localStream = stream;
            setExistingPeers((prevPeers) => ({
                ...prevPeers,
                [myPeerId]: stream,
            }));
            setIsLocalStreamMade(true);
        })
        .catch((error) =>
            console.error('Error accessing media devices.', error),
        );
};
