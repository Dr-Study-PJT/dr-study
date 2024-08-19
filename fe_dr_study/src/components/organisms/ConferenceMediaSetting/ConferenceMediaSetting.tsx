import React, { SetStateAction, useEffect, useState } from 'react';
import Video from '../Video/Video';
import { ClientInterface } from '@/components/template/conference/ConferenceTemplate';
import Icon from '@/components/atoms/Icon/Icon';
import { Dispatch } from '@reduxjs/toolkit';

interface ConferenceMediaSettingProps {
    audioInputs: MediaDeviceInfo[];
    audioOutputs: MediaDeviceInfo[];
    videoInputs: MediaDeviceInfo[];
    localStream: MediaStream | null;
    existingPeers: Record<string, MediaStream>;
    client: ClientInterface;
    handleClickToggleMediaSetting: () => void;
}

const ConferenceMediaSetting = ({
    audioInputs,
    audioOutputs,
    videoInputs,
    localStream,
    existingPeers,
    client,
    handleClickToggleMediaSetting,
}: ConferenceMediaSettingProps) => {
    const [selectedAudioInput, setSelectedAudioInput] = useState(
        audioInputs[0]?.deviceId || '',
    );
    const [selectedAudioOutput, setSelectedAudioOutput] = useState(
        audioOutputs[0]?.deviceId || '',
    );
    const [selectedVideoInput, setSelectedVideoInput] = useState(
        videoInputs[0]?.deviceId || '',
    );

    useEffect(() => {
        const setMediaDevices = async () => {
            // 새로운 미디어 스트림을 가져옵니다.
            const newStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    deviceId: selectedAudioInput
                        ? { exact: selectedAudioInput }
                        : undefined,
                },
                video: {
                    deviceId: selectedVideoInput
                        ? { exact: selectedVideoInput }
                        : undefined,
                },
            });

            // 기존 스트림이 있을 경우, 오디오 트랙을 변경합니다.
            if (localStream) {
                // 기존 오디오 트랙 제거
                localStream.getAudioTracks().forEach((track) => {
                    localStream?.removeTrack(track);
                });

                // 새로운 오디오 트랙 추가
                newStream.getAudioTracks().forEach((track) => {
                    localStream?.addTrack(track);
                });
            } else {
                // 처음 스트림을 설정하는 경우
                localStream = newStream;
            }
        };

        if (selectedAudioInput || selectedVideoInput) {
            setMediaDevices();
        }
    }, [selectedAudioInput, selectedVideoInput]);

    return (
        <div className="relative flex w-full h-full justify-center items-center p-5">
            <button
                className="absolute top-[1rem] right-[1rem]"
                onClick={handleClickToggleMediaSetting}
            >
                <Icon icon="xMark" size="md" cursor="pointer" />
            </button>
            <div className="w-3/5">
                {[Object.keys(existingPeers)?.[0]].map((peerId) => {
                    console.log(existingPeers);
                    return (
                        <React.Fragment key={peerId}>
                            <Video
                                existingPeers={{
                                    [peerId]: existingPeers[peerId],
                                }}
                                peerId={peerId}
                                client={client}
                            />
                        </React.Fragment>
                    );
                })}
            </div>
            <div className="flex flex-col justify-center p-5 w-2/5 h-full">
                <div className="p-3">
                    <label htmlFor="audio-inputs">오디오 입력</label>
                    <select
                        id="audio-inputs"
                        className="w-full bg-black p-1 rounded"
                        value={selectedAudioInput}
                        onChange={(e) => setSelectedAudioInput(e.target.value)}
                    >
                        {audioInputs.map((input) => (
                            <option key={input.deviceId} value={input.deviceId}>
                                {input.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="p-3">
                    <label htmlFor="audio-outputs">오디오 출력</label>
                    <select
                        id="audio-outputs"
                        className="w-full bg-black p-1 rounded"
                        value={selectedAudioOutput}
                        onChange={(e) => setSelectedAudioOutput(e.target.value)}
                    >
                        {audioOutputs.map((output) => (
                            <option
                                key={output.deviceId}
                                value={output.deviceId}
                            >
                                {output.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="p-3">
                    <label htmlFor="video-inputs">비디오 입력</label>
                    <select
                        id="video-inputs"
                        className="w-full bg-black p-1 rounded"
                        value={selectedVideoInput}
                        onChange={(e) => setSelectedVideoInput(e.target.value)}
                    >
                        {videoInputs.map((input) => (
                            <option key={input.deviceId} value={input.deviceId}>
                                {input.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ConferenceMediaSetting;
