import { memberAPI } from '@/app/api/axiosInstanceManager';
import { POST } from '@/app/api/routeModule';
import { IRegisterReq } from '@/interfaces/members';
import { CreateConferenceFormData } from '../CreateConferenceProgress';

export const register = async (memberData: CreateConferenceFormData) => {
    const res = await POST({
        API: memberAPI,
        endPoint: 'register',
        body: memberData,
    });
    return res;
};
