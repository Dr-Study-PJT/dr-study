export interface IMember {
    id: number;
    email: string;
    nickname: string;
    password: string;
}

export interface IMemberData
    extends Pick<IMember, 'id' | 'email' | 'nickname'> {}

export interface IRegisterReq
    extends Pick<IMember, 'email' | 'password' | 'nickname'> {
    file: File | null;
}

export interface ILogInReq extends Pick<IMember, 'email' | 'password'> {}
