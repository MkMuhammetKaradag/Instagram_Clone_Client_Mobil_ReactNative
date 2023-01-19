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

export type UserPostType = {
  // will be deleted
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

export type postCommentType = {
  _id: string;
  description: string;
  user: PostUserType;
};
export type getCommentsFromPostType = {
  message: string;
  data: {
    comments: postCommentType[];
  };
};






export type getDiscoverPostsRequestType = {
  message: string;
  data: {
    posts: PostType[];
  };
};


export type getSearchUsersRequestType = {
  message: string;
  data: {
    users: PostUserType[];
  };
};
