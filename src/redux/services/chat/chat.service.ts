import type { IAskChatbotRequest, IAskChatbotResponse, IChatHistoryResponse, IChatSessionResponse } from "../../../interfaces/chat.interface";
import { apiSlice } from "../base.service";

export const chatApi = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        getChatSessions: builders.query<IChatSessionResponse, void>({
            query: () => ({
                url: "/Chat/GetChatSessions",
                method: "GET"
            }), 
            providesTags: ["Chat"]
        }),
        getSessionHistory: builders.query<IChatHistoryResponse, string>({
            query: (idSession) => ({
                url: `/Chat/History/${idSession}`,
                method: "GET",
            }),
            providesTags: (result, error, idSession) => [{ type: "Chat", id: idSession }],
        }),
        deleteChatSession: builders.mutation<void, string>({
            query: (idSession) => ({
                url: `/Chat/Delete/${idSession}`,
                method: "Delete",
            }),
            invalidatesTags: ["Chat"]
        }),
        askChatbot: builders.mutation<IAskChatbotResponse, IAskChatbotRequest>({
            query: (params) => ({
                url: "/Chat/Ask",
                method: "POST",
                body: params,
            }),
            invalidatesTags: ["Chat"]
        })
    }), 

})

export const { 
    useGetChatSessionsQuery, 
    useGetSessionHistoryQuery, 
    useDeleteChatSessionMutation, 
    useAskChatbotMutation } = chatApi;