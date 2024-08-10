import { A } from 'msw/lib/core/HttpResponse-B07UKAkU';
import { articleAPI, commentAPI } from '@/app/api/axiosInstanceManager';
import { UpdateArticle } from '@/interfaces/articles';
import { title } from 'process';
// types.ts
// 일단 삭제는 싹 다 배제하고, 생성과 삭제에 관련한 response만..!

// 이것들은 Request로서 필요한것들임!
export interface ArticlePostReq {
    title: string;
    content: string;
    studyGroupId: number;
    tags?: [];
}

// 이것들은 Response로서 필요한것들임!
export interface Member {
    id: number;
    email: string;
    nickname: string;
    imageUrl: string;
    regDate: string;
    leavedDate: string | null;
    leaved: boolean;
}

export interface CommentData {
    id: number;
    content: string;
    createdAt: string;
    memberInfo: {
        id: number;
        email: string;
        nickname: string;
        imageUrl: string;
        regDate: string;
        leavedDate: string | null;
        leaved: boolean;
    };
    data: {
        commentId: number;
    };
}

export interface ArticleData {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    viewCount: number;
    memberInfo: Member;
    comments: CommentData[]; // CommentData 배열로 수정
    studyGroupId?: number;
    tags: string[];
}

// 생성 요청에 대한 것들임! =>
export interface ICreateArticleReq
    extends Pick<ArticleData, 'title' | 'content' | 'studyGroupId' | 'tags'> {}

export interface CreateCommentContent {
    content: string;
}

// 수정에 관한 것들임!!
export interface UpdateArticleReq {
    title: string;
    content: string;
}

export interface UpdateCommentReq {
    content: string;
}

// 게시글은 삭제에 대해서만....

// 댓글은 POST, PATCH, DELETE(삭제는 commentId만..! params로 받으면 끝..!)

// - case 1) req
export interface CommentPostReq {
    commentId?: number;
    content: string;
}

export interface CommentUpdateReq {
    commentId?: number;
    content: string;
}


// - case 2) res

export interface CommentPostRes {
    message: string;
    data: {
        commentId?: number
    }
}

export interface CommentUpdateRes {
    message: string;
    data: {
        commentId?: number;
    }
}
