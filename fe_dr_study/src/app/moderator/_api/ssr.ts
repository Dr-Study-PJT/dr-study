import { GET } from '@/app/api/routeModule';
import { dummyGroupListData } from '@/app/group/[group_id]/dummy';

export interface SearchParams {
    page?: number;
    tagName?: string;
    name?: string;
    size?: number;
}

export interface IGroup {
    id: number;
    name: string;
    imageUrl: string;
    createdAt: string;
    dueDate: string;
    isDeleted: boolean;
    description: string;
    tags: string[];
    memberCount: number;
    memberCapacity: number;
}

export interface IGroupListResponse {
    totalElements: number;
    totalPages: number;
    pageable: any;
    sort: any[];
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    content: IGroup[];
    empty: boolean;
}

export const getModeratorListBy = async ({
    page,
    size,
    tagName,
    name,
}: SearchParams): Promise<IGroupListResponse | void> => {
    'use server';
    const baseUrl = `v1/groups?page=${page}&size=${size}`;
    let urlWithFilterQuery = `${baseUrl}`;

    if (tagName) {
        urlWithFilterQuery += `&tagName=${tagName}`;
    }

    if (name) {
        urlWithFilterQuery += `&name=${name}`;
    }

    console.log('GET EndPoint: ', urlWithFilterQuery);
    try {
        const response = await GET(urlWithFilterQuery);
        console.log('GET 성공 : 그룹리스트');
        console.log(response);
        console.log('content: ' + response.content);
        return response.data as IGroupListResponse;
    } catch (error) {
        console.log('GET 실패 : 그룹리스트 : 더미데이터로 대체합니다.');
        console.error('에러:' + error);

        // return dummyGroupListData as IGroupListResponse;
    }
};

export const getMyGroupList = async ({}) => {
    'use server';
    const response = await GET('');
    return;
};
