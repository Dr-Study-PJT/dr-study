import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { formatDate, getDateTimePart } from '@/utils/date';

interface GroupCardProps {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    createdAt: string;
    tags: string[];
    memberCount: number;
    memberCapacity: number;
}

const GroupCard: React.FC<GroupCardProps> = ({
    id,
    name,
    imageUrl,
    description,
    createdAt,
    tags,
    memberCount,
    memberCapacity,
}) => {
    return (
        <Link href={`/group/${id}`} passHref>
            <div className="GROUP-CARD cursor-pointer relative w-full flex items-start justify-between gap-4 mb-4 bg-dr-indigo-300 hover:bg-dr-indigo-200 transition-all duration-200 rounded-lg h-max min-h-36">
                <div className="-left-[4.5rem] flex flex-row relative h-36">
                    <div className="relative w-36 h-36 mr-4 rounded-full overflow-hidden">
                        <Image
                            className="pl-[4.5rem]"
                            alt={name}
                            src={imageUrl}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="flex items-center relative h-auto overflow-hidden p-2 w-max">
                        <div className="flex flex-row gap-1 h-full justify-between w-[calc(100%-4rem)]">
                            <div className="flex flex-col justify-between">
                                <div className="w-[17rem]">
                                    <div className="flex flex-col space-y-1">
                                        <h3 className="text-dr-header-1 font-semibold text-white">
                                            {name}
                                        </h3>
                                        <p className="INFO-DUE-DATE text-dr-body-5 text-dr-gray-300 flex flex-row gap-8">
                                            {`시작일: ${getDateTimePart(
                                                formatDate(createdAt),
                                                'date',
                                            )}`}
                                        </p>
                                    </div>
                                    <p className="text-dr-body-4 text-dr-gray-200 mt-2">
                                        {description}
                                    </p>
                                </div>
                                <div className="flex space-x-2 w-max">
                                    {tags
                                        ?.slice(0, 3)
                                        .map((tagName, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-[3px] bg-dr-indigo-0 text-dr-body-4 rounded-full text-dr-coral-100 cursor-pointer hover:font-bold hover:bg-dr-indigo-50 transition-all duration-200"
                                            >
                                                {tagName}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="MEMBER-COUNTER absolute top-4 right-4 w-max flex items-center space-x-2 text-dr-gray-300 text-dr-body-4">
                    <FaUsers />
                    <span>
                        {memberCount} / {memberCapacity}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default GroupCard;
