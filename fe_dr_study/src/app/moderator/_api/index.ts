import { moderatorAPI as API } from '@/app/api/axiosInstanceManager';
import { ICreateModeratorReq } from '../_types';

export const createModerator = async (
    createModeratorData: ICreateModeratorReq,
) => {
    const response = await API.post('', createModeratorData);
    return response.data;
};
