export interface CreateArticleReq {
    title: string;
    content: string;
    // studyGroupId: number;
    tags?: [];
}

export interface CreateArticleResponse {
    message: string;
    data: {
        articleId: number;
    };
}