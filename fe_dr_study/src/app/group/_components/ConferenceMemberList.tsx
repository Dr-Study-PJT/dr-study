import React from 'react';
import Image from 'next/image';
import { FaUsers } from 'react-icons/fa';
import Tooltip from '@/components/organisms/SideBar/Tooltip';
import { useRouter } from 'next/navigation';

interface Participant {
    id: number;
    email: string;
    nickname: string;
    imageUrl: string;
    regDate: string;
    leavedDate: string | null;
    leaved: boolean;
}

interface ConferenceMemberListProps {
    participants: Participant[];
    memberCapacity: number;
}

const ConferenceMemberList: React.FC<ConferenceMemberListProps> = ({
    participants,
    memberCapacity,
}) => {
    const router = useRouter();
    return (
        <div className="BL-INFO-MEMBER-LIST flex flex-col gap-1">
            <div className="flex flex-row gap-1 text-dr-gray-300 ml-1">
                <FaUsers className="text-dr-gray-300 text-dr-body-3 self-center pb-0" />
                <div className="text-[0.6rem] text-dr-gray-300 ">
                    {`${participants.length} / ${memberCapacity}`}
                </div>
            </div>

            <ul className="LIST-MEMBER-IMAGES flex flex-row gap-1">
                {participants.slice(0, 3).map((participant, i) => (
                    <li key={i}>
                        <Tooltip text={participant.nickname} direction="top">
                            <div
                                className="relative overflow-hidden w-10 h-10 rounded-xl"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/members/${participant.id}`);
                                }}
                            >
                                <Image
                                    alt="avatar"
                                    src={participant.imageUrl}
                                    layout="fill"
                                />
                            </div>
                        </Tooltip>
                    </li>
                ))}
                {participants.length > 3 && (
                    <li key="extra">
                        <button className="relative overflow-hidden w-10 h-10 rounded-xl border-[1px] border-dr-coral-100 bg-dr-coral-200 hover:bg-dr-coral-100 transition-colors duration-200 flex items-center justify-center">
                            <span className="text-white font-semibold text-dr-body-3">
                                +{participants.length - 3}
                            </span>
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ConferenceMemberList;
