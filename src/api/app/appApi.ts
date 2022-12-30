import { LOCAL_URL } from "../url";
import axios from "axios";
import { getMyFollowUpsPostsRequestType } from "./appApiTypes";
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
