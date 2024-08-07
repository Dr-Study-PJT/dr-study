import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';
import { fetchGroupWithMembersData, getGroupMembers } from './_api/ssr';

const EmptyLayout = async ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['groupWithMembers'],
        queryFn: () => fetchGroupWithMembersData,
    });
    await queryClient.prefetchQuery({
        queryKey: ['membersInThisGroup'],
        queryFn: () => getGroupMembers,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
};

export default EmptyLayout;
