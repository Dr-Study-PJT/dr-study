import { Stomp } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Frame } from 'stompjs';
import Recorder from './Recorder';

interface Message {
    senderId: number;
    message: string;
}

interface Signal {
    senderId: number;
    signal: string;
    rawAudio?: string; // rawAudio를 선택적으로 추가
}

interface SignalProps {
    conferenceId: number;
    memberId: number;
}

const Signal = ({ conferenceId = 1, memberId = 1 }: SignalProps) => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [signal, setSignal] = useState<string>('');
    const [signals, setSignals] = useState<Signal[]>([]);
    const [audioFile, setAudioFile] = useState<File | null>(null); // 선택된 오디오 파일

    const [stompClient, setStompClient] = useState<any>(null); // 타입을 명시적으로 설정

    const CHANNEL = 'topic';

    // 소켓 생성 및 Stomp 클라이언트 생성
    useEffect(() => {
        const socket = new SockJS('http://192.168.100.77:8080/room');

        const clientStomp = Stomp.over(socket);

        setStompClient(clientStomp);
    }, []);

    // 소켓 연결 및 메시지 수신
    useEffect(() => {
        stompClient?.connect({}, (frame: Frame) => {
            console.log('Connected: ' + `/${CHANNEL}/chat/${conferenceId}`);
            stompClient?.subscribe(
                `/${CHANNEL}/chat/${conferenceId}`,
                (message: any) => {
                    const newMessage: Message = JSON.parse(message.body);
                    console.log('message received:');
                    Object.entries(newMessage).forEach(([key, value]) => {
                        console.log(`${key}: ${value}`);
                    });
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        newMessage,
                    ]);

                    console.log(...messages, newMessage);
                },
            );
            stompClient?.subscribe(
                `/${CHANNEL}/signal/${conferenceId}/mute`,
                (signal: any) => {
                    const newSignal: Signal = JSON.parse(signal.body);
                    console.log('mute signal received:');
                    Object.entries(newSignal).forEach(([key, value]) => {
                        console.log(`${key}: ${value}`);
                    });
                    setSignals((prevSignals) => [...prevSignals, newSignal]);

                    console.log(...messages, newSignal);
                },
            );
            stompClient?.subscribe(
                `/${CHANNEL}/signal/${conferenceId}/unmute`,
                (signal: any) => {
                    const newSignal: Signal = JSON.parse(signal.body);
                    console.log('unmute signal received:');
                    Object.entries(newSignal).forEach(([key, value]) => {
                        console.log(`${key}: ${value}`);
                    });
                    setSignals((prevSignals) => [...prevSignals, newSignal]);

                    console.log(...messages, newSignal);
                },
            );
            stompClient?.subscribe(
                `/${CHANNEL}/signal/${conferenceId}/participant-speak-order`,
                (signal: any) => {
                    const newSignal: Signal = JSON.parse(signal.body);
                    console.log('participant-speak-order signal received:');
                    Object.entries(newSignal).forEach(([key, value]) => {
                        console.log(`${key}: ${value}`);
                    });
                    setSignals((prevSignals) => [...prevSignals, newSignal]);

                    console.log(...messages, newSignal);
                },
            );
            stompClient?.subscribe(
                `/${CHANNEL}/signal/${conferenceId}/avatar-speak-order`,
                (signal: any) => {
                    const newSignal: Signal = JSON.parse(signal.body);
                    console.log('avatar-speak-order signal received:');
                    Object.entries(newSignal).forEach(([key, value]) => {
                        console.log(`${key}: ${value}`);
                    });
                    setSignals((prevSignals) => [...prevSignals, newSignal]);

                    console.log(...messages, newSignal);
                },
            );
            stompClient?.subscribe(
                `/${CHANNEL}/signal/${conferenceId}/gpt-summary`,
                (signal: any) => {
                    const newSignal: Signal = JSON.parse(signal.body);
                    console.log('gpt-summary signal received:');
                    Object.entries(newSignal).forEach(([key, value]) => {
                        console.log(`${key}: ${value}`);
                    });
                    setSignals((prevSignals) => [...prevSignals, newSignal]);

                    console.log(...messages, newSignal);
                },
            );
        });
    }, [stompClient]);

    // 메시지 전송
    const sendMessage = () => {
        if (stompClient) {
            stompClient?.send(
                `/pub/chat/${conferenceId}/participant-speak-answer`,
                {},
                JSON.stringify({
                    senderId: memberId,
                    message,
                }),
            );
            setMessage('');
        }
    };

    return (
        <div className="fixed top-0 right-0 flex flex-col h-[92%] bg-dr-gray-100">
            <div className="flex h-full w-full">
                <div className="h-full w-full bg-dr-coral-50">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            ({msg.senderId}) : {msg.message}
                        </div>
                    ))}
                </div>
                <div className="h-full w-full bg-dr-coral-300">
                    {signals.map((msg, index) => (
                        <div key={index}>
                            ({msg.senderId}) : {msg.signal}
                            {signal.rawAudio && (
                                <audio controls>
                                    <source
                                        src={signal.rawAudio}
                                        type="audio/mpeg"
                                    />
                                    Your browser does not support the audio tag.
                                </audio>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex">
                <div className="p-4">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter message"
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div className="p-4">
                    <input
                        type="text"
                        value={signal}
                        onChange={(e) => setSignal(e.target.value)}
                        placeholder="Enter Signal"
                    />
                </div>
                {/* <div className="p-4">
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                            if (e.target.files) {
                                setAudioFile(e.target.files[0]);
                            }
                        }}
                    />
                    <button onClick={sendAudioFile}>Send Audio</button>
                </div> */}
            </div>

            <div className="fixed left-32 bottom-32 bg-dr-gray-200">
                <Recorder memberId={memberId} stompClient={stompClient} />
            </div>
        </div>
    );
};

export default Signal;
