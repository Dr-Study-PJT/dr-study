import { groupAPI as API } from '@/app/api/axiosInstanceManager';
import { ICreateGroupReq } from '../new/_types/type';
import { GET, POST } from '@/app/api/routeModule';
import { IConference } from '../[group_id]/dummy';

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

export const getConferenceList = async (conferenceData: IConference[]) => {
    try {
        const response = await GET('v1/conferences', {
            isAuth: true,
        });
        console.log('컨퍼런스 가져오기 성공');
        console.log(response.data);
        return response.data;
    } catch {
        console.log('컨퍼런스 리스트 가져오기 실패');
    }
};
