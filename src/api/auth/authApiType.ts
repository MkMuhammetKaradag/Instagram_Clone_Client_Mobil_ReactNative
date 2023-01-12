export type userLoginType = {
  email: string;
  password: string;
};
export type userType = {
  email: string;
  userProfilePicture?: string;
  _id: string;
  userNickName: string;
  userLikes?: string[];
  followUps?: string[];
  followers?:string[];
  myFollowRequests?: string[];
};

export type userLoginRequestType = {
  message: string;
  data: {
    user: userType;
  };
};

export type SignupType = {
  email: string;
  password: string;
  userNickName: string;
};
export type PostUserType = {
  userProfilePicture?: string;
  _id: string;
  userNickName: string;
};
