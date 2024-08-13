import React from 'react';
import Image from 'next/image';
import Tooltip from '@/components/organisms/SideBar/Tooltip';
import { useRouter } from 'next/navigation';
import { getBackgroundColorRandomPastel } from '@/utils/colors';

interface MemberAvatarProps {
    urlDisabled?: boolean;
    member: {
        id: number | null;
        nickname: string | null;
        imageUrl: string | null;
    };
}

const MemberAvatar = ({ member, urlDisabled }: MemberAvatarProps) => {
    const router = useRouter();

    const handleRouteHandler = () => {
        if (urlDisabled || !member.id) {
            return;
        }
        router.push(`/member/${member.id}`);
    };

    return (
        <div
            className={`relative overflow-hidden w-[2.3rem] h-[2.3rem] rounded-xl ${!urlDisabled && 'cursor-pointer'} `}
            onClick={handleRouteHandler}
        >
            {member.imageUrl ? (
                <Tooltip
                    text={member.nickname ?? 'Unknown Member'}
                    direction="top"
                >
                    <div className="relative w-[2.3rem] h-[2.3rem] animate-popIn">
                        <Image
                            id={member.id?.toString() ?? 'unknown'}
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
                    id={member.id?.toString() ?? 'unknown'}
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
