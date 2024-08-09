import { Member } from '@/app/group/[group_id]/_types';
import Image from 'next/image';
import React from 'react';

interface ProfileCardProps {
    member: Member | null;
}

const ProfileCard = ({ member }: ProfileCardProps) => {
    console.log('member:', member);
    if (!member) {
        return <div>회원 정보가 없습니다.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center text-center text-dr-white gap-dr-5">
            <div className="relative w-[10rem] h-[10rem] rounded-full overflow-hidden">
                <Image src={member.imageUrl} alt="프로필 이미지" fill />
            </div>
            <div>
                <div className="text-dr-header-2">{member.nickname}</div>
                <div className="text-dr-gray-300">
                    <p>
                        <span className="text-dr-white">Email</span> :
                        {member.email}
                    </p>
                    <p>
                        <span className="text-dr-white">가입일</span> :
                        {member.regDate}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
