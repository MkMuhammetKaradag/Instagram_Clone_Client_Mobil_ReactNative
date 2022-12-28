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