import { GET, POST } from '@/utils/axios/routeModule';
import { groupAPI as API } from '@/utils/axios/axiosInstanceManager';
import { IGroupAdmissionApplyReq } from '../_types';
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

export const postGroupAdmissionApply = async (
    groupAdmissionApplyBody: IGroupAdmissionApplyReq,
) => {
    try {
        const response = await POST({
            API: API,
            endPoint: 'admission/apply',
            body: groupAdmissionApplyBody,
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('postGroupAdmissionApply 에러! ', error);
    }
};
