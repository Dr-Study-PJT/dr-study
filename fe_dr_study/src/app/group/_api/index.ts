import { groupAPI as API } from '@/app/api/axiosInstanceManager';
import { ICreateGroupReq } from '../_types';
import { POST } from '@/app/api/routeModule';

export const createGroup = async (createGroupData: ICreateGroupReq) => {
    try {
        const response = await POST({
            API: API,
            endPoint: '',
            body: createGroupData,
            isAuth: true,
        });
        return response.data;
    } catch (error) {
        console.error('createGroup 에러!! ', error);
    }
};
