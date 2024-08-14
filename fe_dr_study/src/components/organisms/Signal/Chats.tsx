import { getSessionStorageItem } from '@/utils/sessionStorage';
import Image from 'next/image';
import React from 'react';

const Chats = ({
    messages,
}: {
    messages: {
        nickname: string;
        imageUrl: string;
        time: string;
        message: string;
    }[];
}) => {
    return (
        <div className="flex gap-dr-10 flex-col h-full w-full ">
            {messages.map((msg, index) => (
                <div key={index} className="flex items-start p-2 rounded-lg">
                    <div className="relative mr-2 min-w-[2rem] min-h-[2rem] rounded-full overflow-hidden">
                        <Image
                            src={`${msg?.imageUrl || '/images/speaking.png'}`}
                            alt="Profile"
                            fill
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <span className="font-semibold text-slate-300 text-dr-body-3">
                                {msg?.nickname}
                            </span>
                            <span className="text-slate-500 text-dr-body-4 ml-2">
                                {msg?.time &&
                                    new Date(msg?.time).toLocaleDateString()}
                            </span>{' '}
                        </div>
                        <div className="text-slate-200 text-dr-body-4">
                            {msg.message}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// 더미 데이터 사용
// const dummyMessages = [
//     {
//         nickname: 'JohnDoe',
//         imageUrl: '/images/johndoe.png',
//         time: '2024-08-14T14:00:00Z',
//         message: 'Hello! How are you?',
//     },
//     {
//         nickname: 'JaneSmith',
//         imageUrl: '/images/janesmith.png',
//         time: '2024-08-14T14:05:00Z',
//         message: 'I am good, thank you! How about you?',
//     },
//     {
//         nickname: 'Alice',
//         imageUrl: '/images/alice.png',
//         time: '2024-08-14T14:10:00Z',
//         message: 'Just working on the project.',
//     },
// ];

// 더미 데이터를 Chats 컴포넌트에 전달
// const ChatsWithDummyData = () => <Chats messages={dummyMessages} />;

export default Chats;
