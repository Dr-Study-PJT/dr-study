import { RootState } from '@/store';
import { setTimeForAudioRecord } from '@/store/slices/timeForAudioRecord';
import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface RecorderProps {
    conferenceId: number;
    memberId: number;
    stompClient: any;
    isFinishMyTurn: boolean;
    isStartRecordingAudio: boolean;
    setIsFinishMyTurn: Dispatch<SetStateAction<boolean>>;
}

function Recorder({
    memberId,
    conferenceId,
    stompClient,
    isFinishMyTurn,
    isStartRecordingAudio,
    setIsFinishMyTurn,
}: RecorderProps) {
    const dispatch = useDispatch();

    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
    const [isRecording, setIsRecording] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const timeForAudioRecord = useSelector(
        (state: RootState) => state.timeForAudioRecord.timeForAudioRecord,
    );

    useEffect(() => {
        console.log('timeForAudioRecord:', timeForAudioRecord, 'ms');
        if (timeForAudioRecord) {
            startAudioStream();

            // 설정한 시간 후에 오디오 녹음 중지
            const timeout = setTimeout(() => {
                // 내 턴이 끝나지 않았을 때만 시간이 지남에 따라 녹음 중지
                if (!isFinishMyTurn) {
                    stopAudioStream();
                }
            }, timeForAudioRecord);

            return () => {
                clearTimeout(timeout);
                stopAudioStream();
                dispatch(setTimeForAudioRecord(0));
            };
        }
    }, [isStartRecordingAudio]);

    useEffect(() => {
        // 내 턴이 끝나면 곧바로 녹음 중지
        if (isFinishMyTurn) {
            stopAudioStream();
            setIsFinishMyTurn(false);
        }
    }, [isFinishMyTurn]);

    // 오디오 스트림 시작
    const startAudioStream = async () => {
        console.log('start audio stream:', stompClient);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            setAudioStream(stream);

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm',
            });
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                if (chunksRef.current.length > 0) {
                    const blob = new Blob(chunksRef.current, {
                        type: 'audio/webm',
                    });
                    chunksRef.current = []; // Clear chunks
                    const reader = new FileReader();
                    reader.onload = () => {
                        const arrayBuffer = reader.result as ArrayBuffer;

                        // ArrayBuffer를 Base64로 인코딩
                        const base64String = btoa(
                            new Uint8Array(arrayBuffer).reduce(
                                (data, byte) =>
                                    data + String.fromCharCode(byte),
                                '',
                            ),
                        );
                        // STOMP를 통해 오디오 전송
                        console.log('before send audio:');
                        if (stompClient) {
                            stompClient.send(
                                `/pub/signal/${conferenceId}/participant-audio`,
                                {},
                                JSON.stringify({
                                    id: memberId,
                                    rawAudio: base64String as string, // ArrayBuffer로 전송
                                }),
                            );
                        }
                        console.log('after send audio:');
                    };
                    reader.readAsArrayBuffer(blob); // ArrayBuffer로 변환
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
            console.log('Audio recording started');
        } catch (error) {
            console.error('Error accessing audio stream:', error);
        }
    };

    const stopAudioStream = () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state === 'recording'
        ) {
            mediaRecorderRef.current.stop();
            console.log('Audio recording stopped');
            setIsRecording(false);
            setTimeForAudioRecord(0);
        }

        if (audioStream) {
            audioStream.getTracks().forEach((track) => track.stop());
            setAudioStream(null);
        }
    };

    return null;
}

export default Recorder;
