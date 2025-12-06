import type { IBaseResponse } from "./base.interface";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegisterRequest {
    fullName: string;
    email: string;
    password: string
}

export interface IForgotPassRequest {
    email: string
}

export interface IAuthResponseData {
    token: string;
}

export type IAuthResponse = IBaseResponse<IAuthResponseData>;

//state of reduce slice
export interface IAuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
}