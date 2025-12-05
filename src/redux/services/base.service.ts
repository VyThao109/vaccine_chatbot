import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signOut } from "../features/auth/auth.slice";
import type { RootState } from "../store";
import { BASE_API_URL } from "../../utils/constants/globalContants";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
    mode: "cors",
    prepareHeaders: (headers, {getState}) => {
      headers.set('ngrok-skip-browser-warning', 'true');
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
          headers.set("Authorization", `Bearer ${token}`)
      }
      return headers;
    }
});

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      // Token hết hạn -> Tự động Logout
      api.dispatch(signOut());
    } else if (result.error.status === 403) {
      // Không có quyền -> Redirect
      window.location.href = "/forbidden";
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User", "Chat"],
  endpoints: () => ({}),
});