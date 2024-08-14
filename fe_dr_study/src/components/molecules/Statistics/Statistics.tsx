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
            <div className="text-dr-white flex flex-row justify-between h-full gap-12">
                <div className="mb-4 flex-1">
                    <div className="font-semibold text-dr-header-1 text-slate-300">
                        내 관심 태그들
                    </div>
                    <ul className="flex flex-wrap mt-2 text-dr-body-4 px-3 py-4 rounded-xl bg-dr-indigo-200 shadow-dr-rb-2">
                        {Object.entries(statistics.totalGroupTags).map(
                            ([key, value]) => (
                                <li
                                    key={key}
                                    className="bg-dr-indigo-0 text-dr-white px-3 py-1 rounded-full mr-2 mb-2 hover:bg-dr-indigo-50 duration-200 cursor-pointer"
                                >
                                    <Link
                                        href={`/group/list?page=1&size=5&tagName=${key}`}
                                    >
                                        {key}
                                        <span className="text-dr-coral-100 font-semibold text-dr-body-4 ml-1">
                                            {' '}
                                            {value}
                                        </span>
                                    </Link>
                                </li>
                            ),
                        )}
                    </ul>
                </div>

                <div className="flex-1">
                    <span className="font-semibold text-dr-header-1 text-slate-300">
                        <span className="text-dr-coral-100">TOP 3 </span>
                        스터디 그룹
                    </span>
                    <ul className="mt-2">
                        {statistics.top3StudyGroups.map((group) => (
                            <Link
                                href={`/group/${group.studyGroupId}`}
                                key={group.studyGroupId}
                            >
                                <li
                                    key={group.studyGroupId}
                                    className="text-dr-body-3 bg-dr-indigo-0 text-dr-white px-4 py-2 mb-2 rounded-lg shadow hover:bg-dr-indigo-50 duration-200 cursor-pointer"
                                >
                                    {group.studyGroupName}:{' '}
                                    <span className="text-dr-coral-300">
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
