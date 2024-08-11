import MemberAvatar from '@/components/molecules/MemberAvatar';
import { ConferenceData } from '@/interfaces/conference';
import React from 'react';
import { JoiningMember } from './Signal';
import { Member } from '@/app/group/[group_id]/_types';

interface ConferenceParticipantsProps {
    currentMembers: Member[];
}

const ConferenceParticipants = ({
    currentMembers,
}: ConferenceParticipantsProps) => {
    return (
        <div className="absolute top-0 left-0 flex flex-col p-1 gap-dr-5 w-full border overflow-y-scroll h-[20%] border-dr-coral-300 rounded-md z-50 bg-dr-dark-300">
            {currentMembers.map((participant) => (
                <div className="flex w-full items-center gap-dr-5 ">
                    <MemberAvatar member={participant} urlDisabled />
                    {participant.nickname}
                </div>
            ))}
        </div>
    );
};

export default ConferenceParticipants;
