import MemberAvatar from '@/components/molecules/MemberAvatar';
import { ConferenceData } from '@/interfaces/conference';
import React from 'react';

interface ConferenceParticipantsProps {
    conferenceInfo: ConferenceData | null;
}

const ConferenceParticipants = ({
    conferenceInfo,
}: ConferenceParticipantsProps) => {
    return (
        <div className="absolute top-0 left-0 flex flex-col p-1 gap-dr-5 w-full border overflow-y-scroll h-[20%] border-dr-coral-300 rounded-md">
            {conferenceInfo?.participants.map((participant) => (
                <div className="flex w-full items-center gap-dr-5 ">
                    <MemberAvatar member={participant} urlDisabled />
                    {participant.nickname}
                </div>
            ))}
        </div>
    );
};

export default ConferenceParticipants;
