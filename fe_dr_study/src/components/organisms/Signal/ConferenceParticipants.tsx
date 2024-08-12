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
        <div className="absolute top-0 left-0 flex flex-col gap-dr-5 w-full overflow-y-scroll h-[20%] rounded-md z-50  p-[0.5rem] bg-dr-indigo-500 shadow-md">
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
