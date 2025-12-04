import type { IUserProfileResponse } from "../../../interfaces/user.interface";
import { apiSlice } from "../base.service";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        getUserProfile: builders.query<IUserProfileResponse, void>({
            query: () => ({
                url: "/User/GetProfile",
                method: "GET"
            }),
            providesTags: ["User"]
        })
    })
})

export const { useGetUserProfileQuery } = userApi;