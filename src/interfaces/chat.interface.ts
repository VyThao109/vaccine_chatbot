import type { IBaseResponse } from "./base.interface";

export interface IChatSessionResponseData{
    idChatSession: string;
    title: string;
    createdDate: string;
    updatedDate: string;
};

export type IChatSessionResponse = IBaseResponse<IChatSessionResponseData[]>;

export interface IMessageResponseData{
    idChatMessage: string;
    msgContent: string;
    isFromUser: boolean;
    createdDate: string;
};

export type IChatHistoryResponse = IBaseResponse<IMessageResponseData[]>;

export interface IAskChatbotRequest {
    idChatSession: string | null;
    question: string;
}

export interface IAskChatbotResponseData {
    idChatSession: string;
    answer: string;
} 

export type IAskChatbotResponse = IBaseResponse<IAskChatbotResponseData>;