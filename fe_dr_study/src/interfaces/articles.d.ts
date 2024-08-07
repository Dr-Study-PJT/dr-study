///////////////  Article  ///////////////
export interface PostArticle {
    authorId: number;
    title: string;
    content: string;
}

export interface Article {
    id: number;
    authorId: number;
    title: string;
    content: string;
    likeCount: number;  // 좋아요 수
    likedByUser: boolean;  // 사용자가 좋아요를 눌렀는지 여부
}

export interface ReadArticle extends Pick<Article, 'id'> {}

export interface UpdateArticle extends Pick<Article, 'id'> {}

export interface DeleteArticle extends Pick<Article, 'id'> {}

export interface LikeArticle {
    articleId: number;
    userId: number;
}

