import { moderatorAPI as API } from '@/app/api/axiosInstanceManager';
import { ICreateModeratorReq } from '../_types';
import { POST } from '@/app/api/routeModule';

export const createModerator = async (
    createModeratorData: ICreateModeratorReq,
) => {
    try {
        const response = await POST({
            API: API,
            endPoint: '',
            body: createModeratorData,
            isAuth: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('사회자 생성 에반뎅');
    }
};

