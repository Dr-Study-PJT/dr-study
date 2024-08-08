import { Stomp } from '@stomp/stompjs';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Frame } from 'stompjs';
import Recorder from './Recorder';
import { Button } from '@/components/atoms';
import Icon from '@/components/atoms/Icon/Icon';
import { ConferenceMember } from '@/interfaces/conference';
import Image from 'next/image';

interface Message {
    id: number;
    nickname: string;
    message: string;
    imageUrl: string;
    time: string;
}

interface Signal {
    id?: number;
    time?: number; // 발화 시간 또는 아바타 움직임 시간
    content?: string; // GPT 요약
}

interface SignalProps {
    subscriptionList: string[];
    stompClient: any;
    memberData?: any;
    conferenceId: number;
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
    subscriptionList,
    stompClient,
    conferenceId,
    memberData,
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
    const messagesEndRef = useRef(null); // 메시지 목록 끝에 대한 참조

    const [signals, setSignals] = useState<Signal[]>([]); // 수신된 신호 목록을 저장하는 상태

    // 소켓 연결 및 메시지 수신
    let heartbeatInterval: NodeJS.Timeout;
    useEffect(() => {
        // 10초마다 생존 신고 전송

        // 소켓 연결
        stompClient?.connect({}, () => {
            // 메시지를 수신하기 위한 구독 설정
            subscribeToMessages();
            subscribeToSignals();

            heartbeatInterval = setInterval(() => {
                sendHeartbeat(memberData?.id); // memberId는 현재 멤버의 ID로 설정해야 합니다.
            }, 10000); // 10초
        });

        // 컴포넌트 언마운트 시 interval 클리어
        if (!!stompClient && !stompClient.connected) {
            return () => {
                clearInterval(heartbeatInterval);
            };
        }
    }, [stompClient]);

    // URL 생성 함수
    const generateUrl = (type: string) => `/${CHANNEL}/${type}/${conferenceId}`;

    // 채팅 메시지 수신을 위한 구독 설정
    const subscribeToMessages = () => {
        stompClient?.subscribe(generateUrl('chat'), (message: any) => {
            const newMessage: Message = JSON.parse(message.body); // 수신된 메시지 파싱
            subscriptionList.push(newMessage.message); // 수신된 메시지를 구독 목록에 추가
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
        subscribeToSignal('heartstop', handleHeartstop);
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
        console.log('before handleMuteSignal', newSignal);
        if (newSignal.id === memberData?.id) {
            setIsMutedBySystem(true); // mute 상태로 변경
            console.log(
                `handleMuteSignal: 멤버(${memberData?.id}) => Mute 상태로 전환`,
            );
        }
    };

    // Unmute 신호 처리
    const handleUnmuteSignal = (newSignal: Signal) => {
        if (newSignal.id === memberData?.id) {
            setIsMutedBySystem(false); // unmute 상태로 변경
            console.log(
                `handleUnmuteSignal: 멤버(${memberData?.id}) => Unmute 상태로 전환`,
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
        console.log('before setIsAvatarSpeaking', newSignal.time);
        console.log('setTimeOut 시작 전');
        setIsAvatarSpeaking(true); // 아바타 발화 상태로 변경
        setTimeForAvatarSpeaking(newSignal.time as number);
        // 아바타 발화는 해당 시간 동안만 수행
        setTimeout(
            () => {
                console.log('setTimeOut 시작 됨');
                setIsAvatarSpeaking(false);
                setTimeForAvatarSpeaking(0);
            },
            (newSignal.time as number) * 1000,
        );
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
    const handleHeartstop = () => {
        console.log(`handleHeartstop: 모든 스트림 연결 종료 (구현중)`);
    };

    // 메시지 전송 함수
    const sendMessage = () => {
        if (stompClient) {
            // Stomp 클라이언트가 존재할 때
            stompClient?.send(
                `/pub/chat/${conferenceId}`, // 메시지를 보낼 경로
                {},
                JSON.stringify({
                    id: memberData?.id, // 송신자 ID
                    message: message.trim(), // 송신할 메시지
                    nickname: memberData?.nickname, // 송신자 닉네임
                    imageUrl: memberData?.imageUrl, // 송신자 이미지 URL
                    time: new Date(), // 송신 시간
                }),
            );
            setMessage(''); // 메시지 입력 필드 초기화
        }
    };

    // 10초마다 생존 신고
    const sendHeartbeat = (id: number) => {
        if (stompClient) {
            // Stomp 클라이언트가 존재할 때
            stompClient?.send(
                `/pub/signal/${conferenceId}/heartbeat`, // 메시지를 보낼 경로
                {},
                JSON.stringify({
                    id: id, // 송신자 ID
                }),
            );
            setMessage(''); // 메시지 입력 필드 초기화
        }
    };

    return (
        <div className="flex flex-col h-full bg-dr-dark-300 p-[0.5rem]">
            <div
                ref={messagesEndRef}
                className="flex h-full w-full overflow-y-scroll"
            >
                <div className="flex gap-dr-10 flex-col  h-full w-full ">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className="flex items-start p-2 rounded-lg"
                        >
                            <div className="relative mr-2 min-w-[2rem] min-h-[2rem] rounded-full overflow-hidden">
                                <Image
                                    src={`${msg?.imageUrl || '/images/speaking.png'}`}
                                    alt="Profile"
                                    fill
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center">
                                    <span className="font-semibold text-white">
                                        {msg?.nickname}
                                    </span>
                                    <span className="text-gray-400 text-sm ml-2">
                                        {msg?.time &&
                                            new Date(
                                                msg?.time,
                                            ).toLocaleDateString()}
                                    </span>{' '}
                                    {/* 시간 표시 추가 */}
                                </div>
                                <div className="text-gray-200">
                                    {msg.message}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                }}
                className="relative flex h-[10%] gap-dr-10"
            >
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (e.shiftKey) {
                                return; // 아무 동작도 하지 않음
                            } else {
                                e.preventDefault(); // 기본 줄바꿈 방지
                                sendMessage(); // 메시지 제출
                            }
                        }
                    }}
                    placeholder="Enter message"
                    className="pr-[15%] bg-dr-dark-300 border  w-full border-dr-coral-200 rounded-[10px] p-2 text-white" // 배경색, 테두리, 둥근 모서리 추가
                />
                <Button
                    classNameStyles="absolute right-0 bottom-0 bg-transparent hover:bg-transparent"
                    onClick={sendMessage}
                    size="sm"
                >
                    <Icon icon="send" size="sm" shape="contained" />
                </Button>
            </form>

            <div className="fixed left-8 bottom-8 p-3 text-dr-white rounded-xl bg-dr-black bg-opacity-40">
                <Recorder
                    conferenceId={conferenceId}
                    memberId={memberData?.id}
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
