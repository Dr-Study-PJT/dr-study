'use client';

import { GET } from '@/app/api/routeModule';
import { GroupData, Member } from '@/app/group/[group_id]/_types';
import { IConference } from '@/app/group/[group_id]/dummy';
import { fetchConferenceList } from '@/app/group/_components/SectionContents';
import Loading from '@/app/loading';
import MyPageTemplate from '@/components/template/my-page/MyPageTemplate';
import { StatisticsData } from '@/interfaces/statistics';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MemberDetailPage = () => {
    const params = useParams();
    const router = useRouter();

    const { member_id } = params;

    const [member, setMember] = useState<Member | null>(null);
    const [myGroups, setMyGroups] = useState<GroupData[]>([]);
    const [conferences, setConferences] = useState<IConference[]>([]);
    const [statistics, setStatistics] = useState<StatisticsData | null>(null);

    const getMemberData = async () => {
        try {
            const response = await GET(`v1/members`, {
                params: ``,
                isAuth: true,
                revalidateTime: 0,
            });

            console.log('member 조회 성공:', response);
            setMember(response.data);
        } catch (error) {
            console.error('스터디 멤버 리스트 조회 실패:', error);
        }
    };

    const getMyGroups = async () => {
        try {
            const response = await GET(`v1/groups/my-groups`, {
                params: ``,
                isAuth: true,
                revalidateTime: 0,
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
                isClosed: true,
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
            const response = await GET(`v1/statistics/members/${member_id}`, {
                params: ``,
                isAuth: true,
                revalidateTime: 0,
            });

            console.log('statistics 조회 성공:', response);
            setStatistics(response.data);
        } catch (error) {
            console.error('statistics 조회 실패:', error);
        }
    };

    useEffect(() => {
        try {
            getMemberData();
            getMyConferences();
            getStatistics();
            getMyGroups();
        } catch (error) {
            console.error('member page data 요청 실패:', error);
            router.push(`/auth/login?error=access_error`);
        }
    }, []);

    console.log(myGroups);
    if (!member || !conferences || !statistics || !myGroups) {
        return <Loading />;
    }

    return (
        <MyPageTemplate
            member={member}
            conferences={conferences}
            statistics={statistics}
            myGroups={myGroups}
        />
    );
};

export default MemberDetailPage;
