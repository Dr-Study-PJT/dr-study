import { Stomp } from '@stomp/stompjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Frame } from 'stompjs';
import Recorder from './Recorder';
import { Button } from '@/components/atoms';

interface Message {
    id: number;
    message: string;
}

interface Signal {
    id?: number;
    time?: number; // 발화 시간 또는 아바타 움직임 시간
    content?: string; // GPT 요약
}

interface SignalProps {
    conferenceId: number;
    memberId: number;
    setIsMutedBySystem: Dispatch<SetStateAction<boolean>>;
    setFocusingMemberId: Dispatch<SetStateAction<number>>;
    setIsAvatarSpeaking: Dispatch<SetStateAction<boolean>>;
    setTimeForAvatarSpeaking: Dispatch<SetStateAction<number>>;
    setGPTSummaryBySystem: Dispatch<SetStateAction<string>>;
    timeForAudioRecord: number;
    setTimeForAudioRecord: Dispatch<SetStateAction<number>>;
    isStartRecordingAudio: boolean;
    setIsStartRecordingAudio: Dispatch<SetStateAction<boolean>>;
}

const Signal = ({
    conferenceId = 1,
    memberId = 1,
    setIsMutedBySystem,
    setFocusingMemberId,
    setIsAvatarSpeaking,
    setTimeForAvatarSpeaking,
    setGPTSummaryBySystem,
    timeForAudioRecord,
    setTimeForAudioRecord,
    isStartRecordingAudio,
    setIsStartRecordingAudio,
}: SignalProps) => {
    const CHANNEL = 'topic'; // 채널 이름

    const [message, setMessage] = useState<string>(''); // 사용자가 입력한 메시지를 저장하는 상태
    const [messages, setMessages] = useState<Message[]>([]); // 수신된 메시지 목록을 저장하는 상태
    const [signals, setSignals] = useState<Signal[]>([]); // 수신된 신호 목록을 저장하는 상태

    const [stompClient, setStompClient] = useState<any>(null); // Stomp 클라이언트 상태

    // 소켓 생성 및 Stomp 클라이언트 생성
    useEffect(() => {
        const socket = new SockJS('http://192.168.163.126:8080/room'); // SockJS 소켓 생성
        // const socket = new SockJS(`${TARGET_HOST}/${endpoint}`); // SockJS 소켓 생성
        const clientStomp = Stomp.over(socket); // Stomp 클라이언트 생성

        setStompClient(clientStomp); // 생성한 Stomp 클라이언트 상태에 저장
    }, []);

    // 소켓 연결 및 메시지 수신
    useEffect(() => {
        // 소켓 연결
        stompClient?.connect({}, () => {
            // 메시지를 수신하기 위한 구독 설정
            subscribeToMessages();
            subscribeToSignals();
        });
    }, [stompClient]);

    // URL 생성 함수
    const generateUrl = (type: string) => `/${CHANNEL}/${type}/${conferenceId}`;

    // 채팅 메시지 수신을 위한 구독 설정
    const subscribeToMessages = () => {
        stompClient?.subscribe(generateUrl('chat'), (message: any) => {
            const newMessage: Message = JSON.parse(message.body); // 수신된 메시지 파싱
            setMessages((prevMessages) => [...prevMessages, newMessage]); // 수신된 메시지를 메시지 목록에 추가
        });
    };

    // 다양한 신호 수신을 위한 구독 설정
    const subscribeToSignals = () => {
        subscribeToSignal('mute', handleMuteSignal);
        subscribeToSignal('unmute', handleUnmuteSignal);
        subscribeToSignal('participant-speak', handleParticipantSpeakSignal);
        subscribeToSignal('avatar-speak', handleAvatarSpeakSignal);
        subscribeToSignal('gpt-summary', handleGPTSummarySignal);
        subscribeToSignal('next-step', handleNextStepSignal);
        subscribeToSignal('death-signal', handleDeathSignal);
    };

    // 신호 수신을 위한 구독 함수
    const subscribeToSignal = (
        signalType: string,
        handler: (signal: any) => void,
    ) => {
        stompClient?.subscribe(
            generateUrl(`signal/${signalType}`),
            (signal: any) => {
                const newSignal: Signal = JSON.parse(signal.body); // 수신된 신호 파싱
                console.log(
                    `${signalType} signal received => \n newSignal: ${newSignal} \n`,
                ); // 신호 수신 로그
                setSignals((prevSignals) => [...prevSignals, newSignal]); // 신호 목록에 추가
                handler(newSignal); // 각 신호에 맞는 핸들러 호출
            },
        );
    };

    // Mute 신호 처리
    const handleMuteSignal = (newSignal: Signal) => {
        if (newSignal.id === memberId) {
            setIsMutedBySystem(true); // mute 상태로 변경
            console.log(
                `handleMuteSignal: 멤버(${memberId}) => Mute 상태로 전환`,
            );
        }
    };

    // Unmute 신호 처리
    const handleUnmuteSignal = (newSignal: Signal) => {
        if (newSignal.id === memberId) {
            setIsMutedBySystem(false); // unmute 상태로 변경
            console.log(
                `handleUnmuteSignal: 멤버(${memberId}) => Unmute 상태로 전환`,
            );
        }
    };

    // 발화 신호 처리
    const handleParticipantSpeakSignal = (newSignal: Signal) => {
        setFocusingMemberId(newSignal.id as number); // 발화자 id로 포커싱
        setTimeForAudioRecord(newSignal.time as number); // 오디오 스트림 타이머
        setIsStartRecordingAudio(true); // 오디오 녹음 시작
        console.log(
            `handleParticipantSpeakSignal: 멤버(${newSignal.id}) => 화면 포커싱, 오디오 스트림 타이머 실행 + 오디오 녹음 시작 + 버퍼를 서버로 전송`,
        );
    };

    // 아바타 발화 신호 처리
    const handleAvatarSpeakSignal = (newSignal: Signal) => {
        setIsAvatarSpeaking(true); // 아바타 발화 상태로 변경
        setTimeForAvatarSpeaking(newSignal.time as number);
        // 아바타 발화는 해당 시간 동안만 수행
        console.log(
            `handleAvatarSpeakSignal: 사회자 아바타 => 발화 상태로 ${newSignal.time}초 동안 전환 + Audio 실행 (S3 기능 구현 대기중)`,
        );
    };

    // GPT 요약 신호 처리
    const handleGPTSummarySignal = (newSignal: Signal) => {
        setGPTSummaryBySystem(newSignal.content as string); // 요약 내용 설정
        console.log(
            `handleGPTSummarySignal: 요약 메시지 전달 => \n ${newSignal.content}`,
        );
    };

    // 다음 발화자 신호 처리
    const handleNextStepSignal = () => {
        console.log(`handleNextStepSignal: 다음 스텝 표시 (구현중)`);
    };

    // 방송 종료 신호 처리
    const handleDeathSignal = () => {
        console.log(`handleDeathSignal: 모든 스트림 연결 종료 (구현중)`);
    };

    // 메시지 전송 함수
    const sendMessage = () => {
        if (stompClient) {
            // Stomp 클라이언트가 존재할 때
            stompClient?.send(
                `/pub/chat/${conferenceId}`, // 메시지를 보낼 경로
                {},
                JSON.stringify({
                    id: memberId, // 송신자 ID
                    message, // 송신할 메시지
                }),
            );
            console.log(`sendMessage: 메시지 전송 => ${memberId}: ${message}`);
            setMessage(''); // 메시지 입력 필드 초기화
        }
    };

    // 10초마다 생존 신고
    const sendHeartbeat = (memberId: number) => {
        if (stompClient) {
            // Stomp 클라이언트가 존재할 때
            stompClient?.send(
                `/pub/signal/${conferenceId}/heartbeat`, // 메시지를 보낼 경로
                {},
                JSON.stringify({
                    id: memberId, // 송신자 ID
                }),
            );
            console.log(`sendHeartbeat: 생존신호 전송 => ${memberId}: isAlive`);
        }
    };

    return (
        <div className="flex flex-col h-full bg-dr-dark-300">
            <div className="flex h-full w-full ">
                <div className="h-full w-full  ">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            ({msg.id}) : {msg.message}
                        </div>
                    ))}
                </div>
                <div className="h-full w-full ">
                    {signals.map((msg, index) => (
                        <div key={index}>
                            <div>Id : {msg.id || 'no id'}</div>
                            <div>Time : {msg.time || 'no time'}</div>
                            <div>Content : {msg.content || 'no content'}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex h-[10%] p-2 gap-dr-10">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message"
                    className="bg-dr-dark-300 border border-dr-coral-200 rounded-[10px] p-2 text-white" // 배경색, 테두리, 둥근 모서리 추가
                />
                <Button onClick={sendMessage} size="sm">
                    전송
                </Button>
            </div>

            <div className="fixed left-8 bottom-8 p-3 text-dr-white rounded-xl bg-dr-black bg-opacity-40">
                <Recorder
                    conferenceId={conferenceId}
                    memberId={memberId}
                    stompClient={stompClient}
                    timeForAudioRecord={timeForAudioRecord}
                    setTimeForAudioRecord={setTimeForAudioRecord}
                    isStartRecordingAudio={isStartRecordingAudio}
                />
            </div>
        </div>
    );
};

export default Signal;
