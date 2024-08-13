import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Recorder from './Recorder';
import { Button } from '@/components/atoms';
import Icon from '@/components/atoms/Icon/Icon';
import { Client } from 'stompjs';
import { ClientInterface } from '@/components/template/conference/ConferenceTemplate';
import { ConferenceData } from '@/interfaces/conference';
import Chats from './Chats';
import ConferenceParticipants from './ConferenceParticipants';
import { Member } from '@/app/group/[group_id]/_types';
import { useDispatch } from 'react-redux';
import {
    setFullPhase,
    setNextStep,
} from '@/store/slices/conferenceProgressSlice';
import { setIsAvatarSpeaking } from '@/store/slices/isAvatarSpeakingSlice';
import { setTimeForAvatarSpeaking } from '@/store/slices/timeForAvatarSpeakingSlice';
import { setIsMutedBySystem } from '@/store/slices/isMutedBySystemSlice';
import { setGptSummaryBySystem } from '@/store/slices/gptSummaryBySystemSlice';
import { pushSummaryMessages } from '@/store/slices/summaryMessagesSlice';

export interface JoiningMember {
    id: number;
    nickname: string;
    imageUrl: string | null;
}

interface Message {
    id: number;
    nickname: string;
    message: string;
    imageUrl: string;
    time: string;
}

interface SignalInterface {
    id?: number;
    time?: number; // 발화 시간 또는 아바타 움직임 시간
    content?: string; // GPT 요약
    peerId?: string; // 방송 종료 시 peerId
    next?: number; // 다음 발화자
    programme?: any;
    imageUrl?: string;
    nickname?: string;
    phase?: number;
}

interface SignalProps {
    currentMembers: Member[];
    setCurrentMembers: Dispatch<SetStateAction<Member[]>>;
    conferenceInfo: ConferenceData | null;
    client: ClientInterface;
    isJoined: boolean;
    existingPeers: Record<string, MediaStream>;
    setExistingPeers: Dispatch<SetStateAction<Record<string, MediaStream>>>;
    subscriptionList: string[];
    stompClient: Client | null;
    memberData?: any;
    conferenceId: number;
    isStartRecordingAudio: boolean;
    setIsStartRecordingAudio: Dispatch<SetStateAction<boolean>>;
}

const Signal = ({
    currentMembers,
    setCurrentMembers,
    client,
    isJoined,
    existingPeers,
    setExistingPeers,
    subscriptionList,
    stompClient,
    conferenceId,
    memberData,

    isStartRecordingAudio,
    setIsStartRecordingAudio,
}: SignalProps) => {
    const dispatch = useDispatch();

    const CHANNEL = 'topic'; // 채널 이름
    const [message, setMessage] = useState<string>(''); // 사용자가 입력한 메시지를 저장하는 상태
    const [messages, setMessages] = useState<Message[]>([]); // 수신된 메시지 목록을 저장하는 상태
    const [timeForAudioRecord, setTimeForAudioRecord] = useState<number>(0); // 오디오 스트림 시작 신호

    const messagesEndRef = useRef<HTMLDivElement>(null); // 메시지 목록 끝에 대한 참조

    useEffect(() => {
        // 소켓 연결
        const connectSocket = () => {
            stompClient?.connect(
                { memberId: memberData.id, roomId: conferenceId },
                () => {
                    if (stompClient?.connected) {
                        subscribeToMessages();
                        subscribeToSignals();
                    }
                },
            );
        };
        if (isJoined) {
            connectSocket();
        }
    }, [isJoined]);

    // 채팅 메시지 수신을 위한 구독 설정
    const generateUrl = (type: string) => `/${CHANNEL}/${type}/${conferenceId}`;
    const subscribeToMessages = () => {
        stompClient?.subscribe(generateUrl('chat'), (message: any) => {
            const newMessage: Message = JSON.parse(message.body); // 수신된 메시지 파싱
            subscriptionList.push(newMessage.message); // 수신된 메시지를 구독 목록에 추가
            setMessages((prevMessages) => [...prevMessages, newMessage]); // 수신된 메시지를 메시지 목록에 추가

            if (messagesEndRef.current) {
                messagesEndRef.current.scrollTop =
                    messagesEndRef.current.scrollHeight;
            }
        });
    };

    // 다양한 신호 수신을 위한 구독 설정
    const subscribeToSignals = () => {
        subscribeToSignal('joining', handleJoining);
        subscribeToSignal('mute', handleMuteSignal);
        subscribeToSignal('unmute', handleUnmuteSignal);
        subscribeToSignal('participant-speak', handleParticipantSpeakSignal);
        subscribeToSignal('avatar-speak', handleAvatarSpeakSignal);
        subscribeToSignal('gpt-summary', handleGPTSummarySignal);
        subscribeToSignal('next-step', handleNextStepSignal);
        subscribeToSignal('heartstop', handleHeartstop);
        subscribeToSignal('programme', handleProgramme);
    };

    // 신호 수신을 위한 구독 함수
    const subscribeToSignal = (
        signalType: string,
        handler: (signal: any) => void,
    ) => {
        stompClient?.subscribe(
            generateUrl(`signal/${signalType}`),
            (signal: any) => {
                const newSignal: SignalInterface = JSON.parse(signal.body); // 수신된 신호 파싱
                handler(newSignal); // 각 신호에 맞는 핸들러 호출
            },
        );
    };

    // Mute 신호 처리
    const handleMuteSignal = (newSignal: SignalInterface) => {
        if (newSignal.id === memberData?.id) {
            dispatch(setIsMutedBySystem(true));
        }
    };

    // Unmute 신호 처리
    const handleUnmuteSignal = (newSignal: SignalInterface) => {
        if (newSignal.id === memberData?.id) {
            dispatch(setIsMutedBySystem(false));
        }
    };

    // 발화 신호 처리
    const handleParticipantSpeakSignal = (newSignal: SignalInterface) => {
        // newSignal.id 라는 멤버 아이디를 가진 사람의 피어 아이디를 focusingPeerId
        if (client.memberId.toString() === newSignal.id?.toString()) {
            setTimeForAudioRecord(newSignal.time as number); // 오디오 스트림 타이머
            setIsStartRecordingAudio(true); // 오디오 녹음 시작
        }
    };

    // 아바타 발화 신호 처리
    const handleAvatarSpeakSignal = (newSignal: SignalInterface) => {
        dispatch(setIsAvatarSpeaking(true));
        dispatch(setTimeForAvatarSpeaking(newSignal.time));

        setTimeout(() => {
            dispatch(setIsAvatarSpeaking(false));
            dispatch(setTimeForAvatarSpeaking(0));
        }, newSignal.time as number);
    };

    // GPT 요약 신호 처리
    const handleGPTSummarySignal = (newSignal: SignalInterface) => {
        dispatch(setGptSummaryBySystem(newSignal.content as string));
        dispatch(
            pushSummaryMessages({
                message: newSignal.content || '[올바르지 않은 문자열]',
                time: new Date().toLocaleTimeString(),
            }),
        );
    };

    // 다음 발화자 신호 처리
    const handleNextStepSignal = (newSignal: SignalInterface) => {
        if (newSignal) dispatch(setNextStep());
    };

    // 신호 단계 신호 처리
    const handleProgramme = (newSignal: SignalInterface) => {
        dispatch(setFullPhase({ programme: newSignal.programme }));
    };

    // joining 단계 신호 처리
    const handleJoining = (newSignal: SignalInterface) => {
        setCurrentMembers((prevMembers): any => [
            ...prevMembers,
            {
                id: newSignal.id, // 이제 id는 number임이 보장됨
                imageUrl: newSignal.imageUrl || null, // imageUrl이 undefined일 경우 null로 설정
                nickname: newSignal.nickname || '', // nickname이 undefined일 경우 빈 문자열로 설정
            },
        ]);
    };

    // 방송 종료 신호 처리
    const handleHeartstop = (newSignal: SignalInterface) => {
        setExistingPeers((existingPeers) => {
            const newPeers = { ...existingPeers };
            delete newPeers[newSignal.peerId as string];
            return newPeers;
        });

        setCurrentMembers((currentMembers) =>
            currentMembers.filter((member) => member.id !== newSignal.id),
        );
    };

    // 메시지 전송 함수
    const sendMessage = () => {
        if (!message.trim()) {
            return; // 메시지가 없을 경우 아무 동작도 하지 않음
        }

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

    return (
        <div className="flex flex-col w-1/5 h-full bg-dr-dark-300">
            <div className="relative w-full h-[90%] text-dr-white ">
                <div className="pb-[0.1rem] shadow-xl">
                    <ConferenceParticipants currentMembers={currentMembers} />
                </div>
                <div className="h-[20%] "></div>
                <div
                    ref={messagesEndRef}
                    className="flex flex-col h-[80%] w-full overflow-y-scroll"
                >
                    <Chats messages={messages} />
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                }}
                className="relative flex h-[10%] gap-dr-10  p-[0.5rem]"
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

            <div className="fixed left-[3rem] bottom-[5rem] p-3 text-dr-white rounded-xl bg-dr-black bg-opacity-40">
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
