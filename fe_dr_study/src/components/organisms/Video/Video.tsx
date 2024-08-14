import RootLayout from '@/app/layout';
import { ClientInterface } from '@/components/template/conference/ConferenceTemplate';
import { RootState } from '@/store';
import React, { use, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface VideoProps {
    existingPeers: Record<string, MediaStream>;
    peerId: string;
    client: ClientInterface;
}

const Video = ({ existingPeers, peerId, client }: VideoProps) => {
    useEffect(() => {
        setDisplayCount(Object.keys(existingPeers).length);
    }, [existingPeers]);

    const [displayCount, setDisplayCount] = useState<number>(
        Object.keys(existingPeers).length,
    );

    const videoDimensions = () => {
        switch (displayCount) {
            case 1:
                return 'h-full w-full'; // 1명일 때 전체 크기
            case 2:
                return 'h-full w-1/2'; // 2명, 3명, 4명일 때 각각 세로의 50%
            case 3:
            case 4:
                return 'h-1/2 w-1/2'; // 2명, 3명, 4명일 때 각각 세로의 50%
            case 5:
            case 6:
                return 'h-1/2 w-1/3'; // 5명, 6명일 때 각각 세로의 33.33%
            case 7:
            case 8:
            case 9:
                return 'h-1/3 w-1/3'; // 7명, 8명일 때 각각 세로의 25%
            default:
                return 'h-1/4 w-1/4'; // 그 외의 경우 기본값
        }
    };

    return (
        <div
            className={`relative ${videoDimensions()} flex border-[1px] border-dr-gray-500 items-center justify-center self-center rounded-lg overflow-hidden `}
        >
            <video
                ref={(el) => {
                    if (el) {
                        el.srcObject = existingPeers[peerId];
                        el.play();
                    }
                }}
                autoPlay
                className="w-full h-full object-cover" // 비디오가 컨테이너에 맞게 조정
            ></video>
            <VideoBorder client={client} />
        </div>
    );
};

export default Video;

const VideoBorder = ({ client }: { client: ClientInterface }) => {
    const focusingPeerId = useSelector(
        (state: RootState) => state.focusingPeerId.focusingPeerId,
    );

    return client?.memberId === focusingPeerId ? (
        <div className="absolute h-full w-full flex items-center justify-center self-center rounded-lg overflow-hidden border-[2px] border-dr-coral-200"></div>
    ) : null;
};
