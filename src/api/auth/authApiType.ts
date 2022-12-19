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
  myFollowRequests00?: string[];
};

export type userLoginRequestType = {
  message: string;
  data: {
    user: userType;
  };
};
