import type { ILoginRequest, IAuthResponse, IRegisterRequest } from "../../../interfaces/auth.interface";
import { apiSlice } from "../base.service";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, ILoginRequest>({
            query: (credentials) => ({
                url: "/Authen/Login",
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: IAuthResponse) => {
                return response;
            }
        }),
        register: builder.mutation<IAuthResponse, IRegisterRequest>({
            query: (credentials) => ({
                url: "/Authen/Register",
                method: "POST",
                body: credentials,
            }),
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authApi;



