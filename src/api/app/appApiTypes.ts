import { PostUserType } from "../auth/authApiType";

export type PostType = {
  _id: string;
  description: string;
  type: string;
  hastags: string[];
  likes: string[];
  owner: PostUserType;
  comments: string[];
  total_views: number;
  video_url: string | null;
  image_url: string | null;
  createdAt: string;
};

export type getMyFollowUpsPostsRequestType = {
  message: string;
  data: {
    myFollowUpsPosts: PostType[];
  };
};

export interface UserType {
  _id: string;
  userProfilePicture?: string;
  userNickName: string;
}
export interface ChatsType {
  _id: string;
  users: UserType[];
}
export type getChatsRequestType = {
  message: string;
  data: {
    chats: ChatsType[];
  };
};

export type UserPostType = {
  _id: string;
  description: string;
  type: string;
  hastags: string[];
  likes: UserType[];
  comments: {
    _id: string;
    description: string;
    user: UserType;
  }[];
  total_views: number;
  video_url: string | null;
  image_url: string | null;
  createdAt: string;
};
export type getUserType = {
  email: string;
  userProfilePicture: string | null;
  _id: string;
  userNickName: string;
  followUps: string[] | UserType[];
  followers: string[] | UserType[];
  userPosts: UserPostType[];
  profilePrivate: boolean;
};
export type getUserRequestType = {
  message: string;
  data: {
    user: getUserType;
  };
};
