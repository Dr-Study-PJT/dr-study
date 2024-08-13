import { StatisticsData } from '@/interfaces/statistics';
import Link from 'next/link';
import React from 'react';

interface StatisticsProps {
    statistics: StatisticsData | null;
}

const Statistics = ({ statistics }: StatisticsProps) => {
    if (!statistics) {
        return <div className="text-dr-white text-center">로딩중...</div>;
    }

    return (
        <div className="text-dr-white p-6 rounded-lg flex flex-col justify-start items-start h-full">
            <div className="text-left text-dr-header-3 text-dr-coral-50 pt-[1rem] pb-[1rem] font-bold w-full h-full">
                스터디 통계
            </div>
            <div className="text-dr-white flex flex-col justifiy-evenly h-full">
                <div className="flex flex-row gap-4 justify-start">
                    <div className="mb-4">
                        <span className="font-semibold">총 회의 시간:</span>{' '}
                        <span className="text-dr-body-1 text-dr-coral-100">
                            {statistics.totalConferenceTime}초
                        </span>
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">총 참여 횟수:</span>{' '}
                        <span className="text-dr-body-1 text-dr-coral-100">
                            {statistics.totalConferenceJoinCount}회
                        </span>
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">
                            총 그룹 참여 횟수:
                        </span>{' '}
                        <span className="text-dr-body-1 text-dr-coral-100">
                            {statistics.totalGroupJoinCount}회
                        </span>
                    </div>
                </div>

                <div className="mb-4">
                    <span className="font-semibold">내 관심 태그들</span>
                    <ul className="flex flex-wrap mt-2">
                        {Object.entries(statistics.totalGroupTags).map(
                            ([key, value]) => (
                                <li
                                    key={key}
                                    className="bg-dr-indigo-0 text-dr-white px-3 py-1 rounded-full mr-2 mb-2 hover:bg-dr-indigo-50 duration-200 cursor-pointer"
                                >
                                    {key}: {value}
                                </li>
                            ),
                        )}
                    </ul>
                </div>

                <div>
                    <span className="font-semibold">Top 3 스터디 그룹</span>
                    <ul className="mt-2">
                        {statistics.top3StudyGroups.map((group) => (
                            <Link
                                href={`/group/${group.studyGroupId}`}
                                key={group.studyGroupId}
                            >
                                <li
                                    key={group.studyGroupId}
                                    className="bg-dr-indigo-0 text-dr-white px-4 py-2 mb-2 rounded-lg shadow hover:bg-dr-indigo-50 duration-200 cursor-pointer"
                                >
                                    {group.studyGroupName}:{' '}
                                    <span className="font-bold text-dr-coral-300">
                                        {group.joinCount}회
                                    </span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
