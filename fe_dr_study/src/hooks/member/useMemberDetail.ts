// hooks/useMemberDetail.ts
import { useEffect, useState } from 'react';
import { GET } from '@/app/api/routeModule';
import { GroupData, Member } from '@/app/group/[group_id]/_types';
import { IConference } from '@/app/group/[group_id]/dummy';
import { fetchConferenceList } from '@/app/group/_components/SectionContents';
import { StatisticsData } from '@/interfaces/statistics';

const useMemberDetail = (member_id: string) => {
    const [member, setMember] = useState<Member | null>(null);
    const [myGroups, setMyGroups] = useState<GroupData[]>([]);
    const [conferences, setConferences] = useState<IConference[]>([]);
    const [statistics, setStatistics] = useState<StatisticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getMemberData = async () => {
        try {
            const response = await GET(`v1/members`, {
                params: `${member_id}`,
                isAuth: true,
                revalidateTime: 0,
            });
            setMember(response.data);
        } catch (error) {
            console.error('스터디 멤버 리스트 조회 실패:', error);
            setErrorMessage('스터디 멤버 정보를 가져오는 데 실패했습니다.');
        }
    };

    const getMyGroups = async () => {
        try {
            const response = await GET(`v1/groups/my-groups`, {
                params: ``,
                isAuth: true,
                revalidateTime: 0,
            });
            setMyGroups(response.data);
        } catch (error) {
            console.error('그룹 리스트 조회 실패:', error);
            setErrorMessage('내 그룹 리스트를 가져오는 데 실패했습니다.');
        }
    };

    const getMyConferences = async () => {
        try {
            const response = await fetchConferenceList({
                memberId: parseInt(member_id),
                isClosed: true,
            });
            setConferences(response);
        } catch (error) {
            console.error('컨퍼런스 리스트 조회 실패:', error);
            setErrorMessage('컨퍼런스 리스트를 가져오는 데 실패했습니다.');
        }
    };

    const getStatistics = async () => {
        try {
            const response = await GET(`v1/statistics/members/${member_id}`, {
                params: ``,
                isAuth: true,
                revalidateTime: 0,
            });
            setStatistics(response.data);
        } catch (error) {
            console.error('통계 조회 실패:', error);
            setErrorMessage('통계 정보를 가져오는 데 실패했습니다.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setErrorMessage(null); // 이전 에러 메시지 초기화
            await Promise.all([
                getMemberData(),
                getMyGroups(),
                getMyConferences(),
                getStatistics(),
            ]);
            setLoading(false);
        };

        fetchData();
    }, [member_id]);

    return { member, myGroups, conferences, statistics, loading, errorMessage };
};

export default useMemberDetail;
