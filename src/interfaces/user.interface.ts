import type { IBaseResponse } from "./base.interface";

export interface IUserProfileResponseData {
    idUser: string;
    fullName: string;
    email: string;
}

export type IUserProfileResponse = IBaseResponse<IUserProfileResponseData>;