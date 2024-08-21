'use client';

import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import MyPageTemplate from '@/components/template/my-page/MyPageTemplate';
import useMemberDetail from '@/hooks/member/useMemberDetail';
import { URLs } from '@/constants/URLs';
import { getSessionStorageItem } from '@/utils/sessionStorage';

const MemberDetailPage = () => {
    const currentUrl = usePathname();
    const params = useParams();
    const router = useRouter();
    const { member_id } = params;

    const memberData = getSessionStorageItem('memberData');

    const { member, myGroups, conferences, statistics, loading, errorMessage } =
        useMemberDetail(member_id as string);

    // 로딩 중인 경우 로딩 컴포넌트를 렌더링
    if (loading) {
        return <Loading />;
    }

    // 에러가 발생한 경우 404 페이지로 리다이렉트
    if (errorMessage) {
        return redirect(URLs.NOT_FOUND(currentUrl));
    }

    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!memberData) {
        return redirect(URLs.LOGIN('not_login'));
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
