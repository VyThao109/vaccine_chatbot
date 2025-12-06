import type { IChangePassRequest, IUserProfileResponse } from "../../../interfaces/user.interface";
import { apiSlice } from "../base.service";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        getUserProfile: builders.query<IUserProfileResponse, void>({
            query: () => ({
                url: "/User/GetProfile",
                method: "GET"
            }),
            providesTags: ["User"]
        }),
        changePassword: builders.mutation<void, IChangePassRequest>({
            query: (credentials) => ({
                url: "/User/ChangePassword",
                method: "POST",
                body: credentials
            }),
        })
    })
})

export const { useGetUserProfileQuery, useChangePasswordMutation } = userApi;