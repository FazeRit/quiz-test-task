export interface IUser {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISignInDto {
  username: string;
  password: string;
}

export interface ISignUpDto {
  username: string;
  password: string;
}

export interface ISignInResponse {
  user: IUser;
  message: string;
  token: string;
}

export interface ISignUpResponse {
  user: IUser;
  message: string;
  token: string;
}
