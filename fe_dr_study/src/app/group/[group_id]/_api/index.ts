import { GET } from '@/utils/axios/routeModule';

export const fetchGroupData = async (groupId: string) => {
    try {
        const response = await GET('v1/groups', {
            params: groupId,
            isAuth: false,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching group data:', error);
    }
};
