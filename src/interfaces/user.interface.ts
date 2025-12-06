import type { IBaseResponse } from "./base.interface";

export interface IUserProfileResponseData {
    idUser: string;
    fullName: string;
    email: string;
}

export interface IChangePassRequest {
    oldPassword: string;
    newPassword: string;
}

export type IUserProfileResponse = IBaseResponse<IUserProfileResponseData>;