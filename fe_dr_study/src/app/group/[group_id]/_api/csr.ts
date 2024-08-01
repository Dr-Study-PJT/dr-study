import { POST } from '@/app/api/routeModule';
import { groupAPI as API } from '@/app/api/axiosInstanceManager';
import { IGroupAdmissionApplyReq } from '../_types';

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
