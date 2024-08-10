import React from 'react';
import Image from 'next/image';
import Tooltip from '@/components/organisms/SideBar/Tooltip';
import { useRouter } from 'next/navigation';
import { getBackgroundColorRandomPastel } from '@/utils/colors';

interface MemberAvatarProps {
    member: {
        id: number;
        nickname: string;
        imageUrl: string | null;
    };
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({ member }) => {
    const router = useRouter();

    return (
        <div
            className="relative overflow-hidden w-[2.3rem] h-[2.3rem] rounded-xl cursor-pointer"
            onClick={() => router.push(`/members/${member.id}`)}
        >
            {member.imageUrl ? (
                <Tooltip text={member.nickname} direction="top">
                    <div className="relative w-[2.3rem] h-[2.3rem] animate-popIn">
                        <Image
                            id={member.id.toString()}
                            alt="avatar"
                            src={member.imageUrl}
                            unoptimized
                            fill
                            style={{ objectFit: 'cover' }}
                            className={`${getBackgroundColorRandomPastel()}`}
                        />
                    </div>
                </Tooltip>
            ) : (
                <Image
                    id={member.id.toString()}
                    alt="avatar"
                    src="/path/to/fallback-image.png"
                    unoptimized
                    fill
                    style={{ objectFit: 'cover' }}
                />
            )}
        </div>
    );
};

export default MemberAvatar;
