import type { ILoginRequest, IAuthResponse, IRegisterRequest, IForgotPassRequest } from "../../../interfaces/auth.interface";
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
            },
            invalidatesTags: ["User"]
        }),
        register: builder.mutation<IAuthResponse, IRegisterRequest>({
            query: (credentials) => ({
                url: "/Authen/Register",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["User"]
        }),
        forgotPass: builder.mutation<void, IForgotPassRequest>({
            query: (credentials) => ({
                url: `/Authen/ForgotPassword`,
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["User"]
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useForgotPassMutation } = authApi;



