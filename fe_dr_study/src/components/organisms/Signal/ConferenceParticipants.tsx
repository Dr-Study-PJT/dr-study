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
        <div className="absolute top-0 left-0 flex flex-col w-full z-50">
            <div className="w-full h-8 border-y-[1px] border-dr-indigo-0 items-center text-slate-400 text-dr-body-3 text-left dr-gray-100 font-semibold py-1 px-3">
                {`참가자 목록 ( ${currentMembers?.length} )`}
            </div>
            <div className="w-full h-auto p-4 flex flex-col gap-2 overflow-y-scroll max-h-14 border-t-[1px] border-b-[1px] border-dr-indigo-0">
                {currentMembers?.map((participant) => (
                    <div
                        key={participant.id}
                        className="flex w-full items-center gap-3 text-dr-body-3 font-semibold text-slate-400"
                    >
                        <MemberAvatar member={participant} urlDisabled />
                        {participant.nickname}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConferenceParticipants;
