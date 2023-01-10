import { LOCAL_URL } from "../url";
import axios from "axios";
import {
  getChatsRequestType,
  getMyFollowUpsPostsRequestType,
} from "./appApiTypes";
export const BASE_URL = LOCAL_URL;

export const getMyFollowUpsPosts = async (
  pageNuber: number = 0
): Promise<getMyFollowUpsPostsRequestType> => {
  const { data } = await axios.get(
    `${BASE_URL}/Post/myFollowUpsPosts?pageNuber=${pageNuber}`,
    {
      withCredentials: true,
    }
  );
  return data;
};
export const addPostLike = async (postId: string) => {
  const { data } = await axios.put(
    `${BASE_URL}/Post/like/${postId}`,
    undefined,
    {
      withCredentials: true,
    }
  );
  return data;
};
export const removePostLike = async (postId: string) => {
  const { data } = await axios.delete(`${BASE_URL}/Post/like/${postId}`, {
    withCredentials: true,
  });
  return data;
};

export const getChats = async (): Promise<getChatsRequestType> => {
  const { data } = await axios.get(`${BASE_URL}/Chats`, {
    withCredentials: true,
  });
  return data;
};

export type ChatMessage = {
  _id: string;
  from: {
    userProfilePicture: string | null;
    _id: string;
    userNickName: string;
  };
  MessageText: string;
  created_at: string;
  updatedAt: string;
};

type getChatMessagesRequestType = {
  message: string;
  data: {
    messages: {
      _id: string;
      users: string[];
      Messages: ChatMessage[];
    };
  };
};
export const getChatMessages = async (
  chatId: string
): Promise<getChatMessagesRequestType> => {
  const { data } = await axios.get(`${BASE_URL}/Chats/messages/${chatId}`, {
    withCredentials: true,
  });
  return data;
};

export const postUserPostCreated = async (formData: any) => {
  const { data } = await axios.post(`${BASE_URL}/Post`, formData, {
    withCredentials: true,

    headers: {
      accept: "*/*",
      "Content-Type": `multipart/form-data`,
    },
  });
  return data;
};
