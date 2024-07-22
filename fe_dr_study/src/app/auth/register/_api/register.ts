import { memberAPI } from '@/utils/axios/axiosInstanceManager';
import { POST } from '@/utils/axios/routeModule';
import { IRegisterReq } from '@/interfaces/members';

export const register = async (memberData: IRegisterReq) => {
    const res = await POST({
        API: memberAPI,
        endPoint: 'register',
        body: memberData,
    });
    return res;
};
