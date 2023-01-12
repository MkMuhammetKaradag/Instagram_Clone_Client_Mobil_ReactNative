import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import AuthReducer, { User } from "./auth/AuthSlice";
import UserReducer from "./user/UserSlice";
import { getMe } from "../api/auth/authApi";
interface InstagramMobilProviderProps {
  children: React.ReactElement<any>;
}
const InstagramMobilProvider = ({ children }: InstagramMobilProviderProps) => {
  //AuthSlicer State Value
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  //Userslice State value
  const [userLikes, setUserLikes] = React.useState<string[]>([]);
  const [userFollowers, setUserFollowers] = React.useState<string[]>([]);
  const [userFollowUps, setUserFollowUps] = React.useState<string[]>([]);
  React.useEffect(() => {
    getMe()
      .then((res) => {
        //console.log("naberv user");
        setUser(res.data.user);
        setUserLikes(res.data.user?.userLikes ? res.data.user?.userLikes : []);
        setUserFollowUps(
          res.data.user?.followUps ? res.data.user?.followUps : []
        );
        setUserFollowers(
          res.data.user?.followers ? res.data.user?.followers : []
        );
      })
      .catch((err) => {
        //console.log("naber hat");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        //console.log("naber");
      });
  }, []);

  const reducer = {
    auth: AuthReducer,
    user: UserReducer,
  };
  const store = configureStore({
    reducer: reducer,
    preloadedState: {
      auth: {
        user: user,
        isAuthLoading: isLoading,
      },
      user: {
        followers: userFollowers,
        likes: userLikes,
        followUps: userFollowUps,
        chats: [],
      },
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

export default InstagramMobilProvider;
