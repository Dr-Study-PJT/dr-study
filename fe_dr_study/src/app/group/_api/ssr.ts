import { GET } from '@/app/api/routeModule';
import { dummyGroupData, dummyGroupListData } from '../[group_id]/dummy';

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

export const getGroupListBy = async ({
    page,
    size,
    tagName,
    name,
}: SearchParams) => {
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
        console.log('GET 성공 : 그룹리스트');
        const response = await GET(urlWithFilterQuery);
        return response.data.data as IGroup[];
    } catch (error) {
        console.log('GET 실패 : 그룹리스트 : 더미데이터로 대체합니다.');
        return dummyGroupListData as IGroup[];
    }
};
