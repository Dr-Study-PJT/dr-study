'use client';

import ModeratorTemplate from '@/components/template/moderator/ModeratorTemplate';
import Loading from '../../loading';
import useModerators from '@/hooks/moderator/useModerators';
import { redirect, usePathname } from 'next/navigation';
import { URLs } from '@/constants/URLs';

const ModeratorListPage = () => {
    const currentUrl = usePathname();

    const { isLoading, moderators, errorMessage } = useModerators();

    if (isLoading) {
        return <Loading />; // 로딩 중일 때 Loading 컴포넌트 반환
    }

    // 에러가 발생한 경우 404 페이지로 리다이렉트
    if (errorMessage) {
        return redirect(URLs.NOT_FOUND(currentUrl));
    }

    return <ModeratorTemplate moderators={moderators} />;
};

export default ModeratorListPage;
