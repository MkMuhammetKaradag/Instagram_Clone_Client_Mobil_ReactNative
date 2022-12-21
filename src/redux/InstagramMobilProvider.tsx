import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import AuthReducer, { User } from "./auth/AuthSlice";
import { getMe } from "../api/auth/authApi";
interface InstagramMobilProviderProps {
  children: React.ReactElement<any>;
}
const InstagramMobilProvider = ({ children }: InstagramMobilProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    getMe()
      .then((res) => {
        setUser(res.data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setIsLoading(false);
      })
      .finally(() => {
        console.log("naber");
        setIsLoading(false);
      });
  }, []);

  const reducer = {
    auth: AuthReducer,
  };
  const store = configureStore({
    reducer: reducer,
    preloadedState: {
      auth: {
        user: user,
        isAuthLoading: isLoading,
      },
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

export default InstagramMobilProvider;
