export interface CreateArticleReq {
    title: string;
    content: string;
    studyGroupId: number;
    tags?: string[];
}

