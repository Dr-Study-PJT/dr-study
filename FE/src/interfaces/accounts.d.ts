export type Agreement = "Y" | "N";
export type Status = "N" | "R" | "S"; // N: Normal, R: Rest, S: Stop

export interface IUser {
  username: string;
  status: string;
  password: string;
  nickname: string;
  birth_date: string;
}

export interface IRegister
  extends Pick<
    IUser,
    | "username"
    | "password"
    | "nickname"
    | "gender"
    | "birth_date"
  > {}

export interface ILogIn extends Pick<IUser, "username" | "password"> {}
