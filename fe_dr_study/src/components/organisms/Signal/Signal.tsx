import { Stomp } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Frame } from 'stompjs';

interface Message {
    senderId: number;
    message: string;
}

interface Signal {
    senderId: number;
    signal: string;
    rawAudio?: string; // rawAudio를 선택적으로 추가
}

interface ChatMessageProps {
    conferenceId: number;
    memberId: number;
}

const Signal = ({ conferenceId = 1, memberId = 1 }: ChatMessageProps) => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [signal, setSignal] = useState<string>('');
    const [signals, setSignals] = useState<Signal[]>([]);
    const [audioFile, setAudioFile] = useState<File | null>(null); // 선택된 오디오 파일

    const stompClient = useRef();

    const CHANNEL = 'topic';

    useEffect(() => {
        const socket = new SockJS('http://192.168.100.77:8080/room');

        stompClient.current = Stomp.over(socket);
        console.log('stomp.over' + socket);

        stompClient.current.connect({}, (frame: Frame) => {
            console.log('Connected: ' + `/${CHANNEL}/chat/${conferenceId}`);
            stompClient.current.subscribe(
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
            stompClient.current.subscribe(
                `/${CHANNEL}/signal/${conferenceId}`,
                (signal: any) => {
                    const newSignal: Signal = JSON.parse(signal.body);
                    console.log('signal received:');
                    Object.entries(newSignal).forEach(([key, value]) => {
                        console.log(`${key}: ${value}`);
                    });
                    setSignals((prevSignals) => [...prevSignals, newSignal]);

                    console.log(...messages, newSignal);
                },
            );
        });
    }, []);

    const sendMessage = () => {
        if (stompClient) {
            stompClient.current.send(
                `/pub/chat/${conferenceId}`,
                {},
                JSON.stringify({
                    senderId: memberId,
                    message,
                }),
            );
            setMessage('');
        }
    };

    const sendSignal = () => {
        if (stompClient) {
            stompClient.current.send(
                `/pub/signal/${conferenceId}`,
                {},
                JSON.stringify({
                    senderId: memberId,
                    signal,
                }),
            );
            setSignal('');
        }
    };

    const sendAudioFile = () => {
        if (audioFile && stompClient) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Audio = reader.result as string; // Base64 문자열로 변환
                stompClient.current.send(
                    `/pub/signal/${conferenceId}`,
                    {},
                    JSON.stringify({
                        senderId: memberId,
                        signal: 'audio',
                        rawAudio: base64Audio, // Base64 인코딩된 오디오
                    }),
                );
                setAudioFile(null); // 전송 후 파일 초기화
            };
            reader.readAsDataURL(audioFile); // Base64로 변환
        }
    };

    return (
        <div className="fixed top-0 right-0 flex flex-col h-[92%] bg-dr-gray-100">
            <div className="flex h-full w-full">
                <div className="h-full w-full bg-dr-coral-50 h-full">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            ({msg.senderId}) : {msg.message}
                        </div>
                    ))}
                </div>
                <div className="h-full w-full bg-dr-coral-300 h-full">
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
                    <button onClick={sendSignal}>Send</button>
                </div>
                <div className="p-4">
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
                </div>
            </div>
        </div>
    );
};

export default Signal;
