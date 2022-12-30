import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { useAppSelector } from "../redux/hooks";

const RootNavigator = () => {
  const isAuthLoading = useAppSelector((s) => s.auth.isAuthLoading);
  const userSession = useAppSelector((s) => s.auth.user);
  React.useEffect(() => {
    console.log("değişti", isAuthLoading);
  }, [isAuthLoading]);

  return (
    <>
      {!isAuthLoading ? (
        <NavigationContainer>
          {userSession ? <AppStack></AppStack> : <AuthStack></AuthStack>}
        </NavigationContainer>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
    </>
  );
};

export default RootNavigator;
