export interface IMember {
    id: number;
    email: string;
    nickname: string;
    password: string;
}

export interface IMemberData
    extends Pick<IMember, 'id' | 'email' | 'nickname'> {}

export interface IUploadImage {
    File: file | null;
}
export interface IRegisterReq
    extends Pick<IMember, 'email' | 'password' | 'nickname'> {
    imageId: number | null;
    rePassword?: string;
}

export interface ILogInReq extends Pick<IMember, 'email' | 'password'> {}


export interface ArticleData
