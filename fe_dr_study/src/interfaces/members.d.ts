export interface IMember {
    id: number;
    email: string;
    nickname: string;
    password: string;
    imageUrl: string;
    regDate?: string;
    leavedDate?: string;
    isLeaved?: boolean;
}

export interface IMemberData
    extends Pick<IMember, 'id' | 'email' | 'nickname' | 'imageUrl'> {}

export interface IUploadImage {
    File: file | null;
}
export interface IRegisterReq
    extends Pick<IMember, 'email' | 'password' | 'nickname'> {
    imageId?: number | null;
    rePassword?: string;
}

export interface ILogInReq extends Pick<IMember, 'email' | 'password'> {}
