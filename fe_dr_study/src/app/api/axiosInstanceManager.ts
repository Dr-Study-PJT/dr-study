import axios, { AxiosInstance } from 'axios';

// API 인스턴스 생성을 각 페이지로 맡겼을 때, 특정 페이지에서만 initialize 전에 호출한다는 에러가 발생했었음.
//  -> 이는 import, export의 순환참조로 인한 문제였음으로 확인.
//  동일시점의 파일에서 생성하여 뿌려주는 방법으로 순환참조 해결.
//  현재는 인스턴스를 마구 생성하지만, 더 높은 수준의 추상화가 가능할 것으로 보인다.

export const BACKEND_API_VERSION = 'v1';

export const GenerateAPI = (url?: string) => {
    const versionedUrl = url
        ? `${BACKEND_API_VERSION}/${url}`
        : BACKEND_API_VERSION;
    const API: AxiosInstance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_HOST}/${versionedUrl}`,
        withCredentials: true,
    });

    return API;
};

export const authAPI = GenerateAPI('auth');
export const memberAPI = GenerateAPI('members');
export const moderatorAPI = GenerateAPI('moderators');
export const groupAPI = GenerateAPI('groups');
export const conferenceAPI = GenerateAPI('conferences');
export const imageAPI = GenerateAPI('images');
