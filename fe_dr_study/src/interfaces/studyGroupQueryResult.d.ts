// studyGroupQueryResult.d.ts

export interface StudyGroup {
    id: number;
    name: string;
    imageUrl: string;
    createdAt: string; // ISO 8601 형식의 날짜 문자열
    isDeleted: boolean;
    description: string;
    tags: string[]; // 문자열 배열
    dueDate: string; // ISO 8601 형식의 날짜 문자열
    captainId: number;
    memberCapacity: number;
    memberCount: number;
}

export interface Sort {
    direction: string; // 정렬 방향
    nullHandling: string; // null 처리 방식
    ascending: boolean; // 오름차순 여부
    property: string; // 정렬할 속성
    ignoreCase: boolean; // 대소문자 구분 여부
}

export interface Pageable {
    offset: number; // 페이지 오프셋
    sort: Sort[]; // 정렬 정보 배열
    pageSize: number; // 페이지 크기
    paged: boolean; // 페이지 여부
    pageNumber: number; // 페이지 번호
    unpaged: boolean; // 비페이지 여부
}

export interface SearchStudyGroupData {
    totalElements: number; // 총 요소 수
    totalPages: number; // 총 페이지 수
    size: number; // 페이지 크기
    content: StudyGroup[]; // 스터디 그룹 배열
    number: number; // 현재 페이지 번호
    sort: Sort[]; // 정렬 정보 배열
    first: boolean; // 첫 페이지 여부
    last: boolean; // 마지막 페이지 여부
    numberOfElements: number; // 현재 페이지의 요소 수
    pageable: Pageable; // 페이지 정보
    empty: boolean; // 비어있는지 여부
}

export interface StudyGroupQueryResult {
    message: string; // 메시지
    data: SearchStudyGroupData; // 데이터
}
