'use client';

import { GET } from '@/app/api/routeModule';
import { GroupData, Member } from '@/app/group/[group_id]/_types';
import { IConference } from '@/app/group/[group_id]/dummy';
import { fetchConferenceList } from '@/app/group/_components/SectionContents';
import MyPageTemplate from '@/components/template/my-page/MyPageTemplate';
import { StatisticsData } from '@/interfaces/statistics';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const MemberDetailPage = () => {
    const params = useParams();
    const { member_id } = params;

    const [member, setMember] = useState<Member | null>(null);
    const [myGroups, setMyGroups] = useState<GroupData | null>(null);
    const [conferences, setConferences] = useState<IConference[] | null>(null);
    const [statistics, setStatistics] = useState<StatisticsData | null>(null);

    const getMemberData = async () => {
        try {
            const response = await GET(`v1/members`, {
                params: ``,
                isAuth: true,
                revalidateTime: 10,
            });

            console.log('member 조회 성공:', response);
            setMember(response.data);
        } catch (error) {
            console.error('스터디 멤버 리스트 조회 실패:', error);
        }
    };

    const getMyGroups = async () => {
        try {
            const response = await GET(`v1/groups`, {
                params: ``,
                isAuth: true,
                revalidateTime: 10,
            });

            console.log('groups 조회 성공:', response);
            setMyGroups(response.data);
        } catch (error) {
            console.error('스터디 멤버 리스트 조회 실패:', error);
        }
    };

    const getMyConferences = async () => {
        try {
            const response = await fetchConferenceList({
                memberId: parseInt(member_id as string),
                isClose: true,
            });

            console.log('conferences 조회 성공:', response);
            setConferences(response);
        } catch (error) {
            console.error('스터디 멤버 리스트 조회 실패:', error);
        }
    };
    const getStatistics = async () => {
        try {
            console.log('member_id:', member_id);
            `v1/statistics/members/{memberId}`;
            const response = await GET(`v1/statistics/members/${member_id}`, {
                params: ``,
                isAuth: true,
                revalidateTime: 10,
            });

            console.log('statistics 조회 성공:', response);
            setStatistics(response.data);
        } catch (error) {
            console.error('statistics 조회 실패:', error);
        }
    };

    useEffect(() => {
        getMemberData();
        getMyConferences();
        getStatistics();
    }, []);

    if (!member || !conferences) {
        return <div>로딩중...</div>;
    }

    return (
        <MyPageTemplate
            member={member}
            conferences={conferences}
            statistics={statistics}
        />
    );
};

export default MemberDetailPage;
