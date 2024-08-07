import { POST, PUT, PATCH, DELETE } from '@/app/api/routeModule';
import { groupAPI, commentAPI  } from "@/app/api/axiosInstanceManager";
import { Member, ArticleData, CommentData } from "../_types/index"
import { DeleteArticle } from '../../../../../../interfaces/articles';

// 조회글에서 필요한 것?? => 댓글 POST, DELETE, PATCH
// 당장 필요한 것?
// 1. Article에 대해서... => ArticleDelete
// 2. Comment에 대해서... => CommentPost, CommentDelete, CommentPatch


export const DeleteArticle = async (
    groupAdmissionApplyBody: IGroupAdmissionApplyReq,
) => {
    try {
        const response = await POST({
            API: API,
            endPoint: 'admission/apply',
            body: groupAdmissionApplyBody,  =>  
            isAuth: true,
        });
        return response;
    } catch (error) {
        console.error('postGroupAdmissionApply 에러! ', error);
    }
};