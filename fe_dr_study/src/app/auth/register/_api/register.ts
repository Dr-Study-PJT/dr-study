import { memberAPI } from '@/app/api/axiosInstanceManager';
import { POST } from '@/app/api/routeModule';
import { IRegisterReq } from '@/interfaces/members';

export const register = async (memberData: IRegisterReq) => {
    const res = await POST({
        API: memberAPI,
        endPoint: 'register',
        body: memberData,
    });
    return res;
};
