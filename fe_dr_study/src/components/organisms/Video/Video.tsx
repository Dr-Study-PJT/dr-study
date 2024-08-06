import React, { useEffect, useState } from 'react';

interface VideoProps {
    existingPeers: Record<string, MediaStream>;
    peerId: string;
    focusing: boolean;
}

const Video = ({ existingPeers, peerId, focusing }: VideoProps) => {
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
            className={`${videoDimensions()} flex border-[1px] border-dr-gray-500 items-center justify-center self-center rounded-lg overflow-hidden ${focusing ? 'border-2 border-blue-500' : ''}`}
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
        </div>
    );
};

export default Video;
