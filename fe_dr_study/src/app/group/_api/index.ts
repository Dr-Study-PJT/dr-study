import { groupAPI as API } from '@/app/api/axiosInstanceManager';
import { ICreateGroupReq } from '../_types';

export const createGroup = async (createGroupData: ICreateGroupReq) => {
    const response = await API.post('', createGroupData);
    return response.data;
};
