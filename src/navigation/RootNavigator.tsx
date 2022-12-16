import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const RootNavigator = () => {
  const isAuthLoading = false;
  return (
    <NavigationContainer>
      {isAuthLoading ? <AppStack></AppStack> : <AuthStack></AuthStack>}
    </NavigationContainer>
  );
};

export default RootNavigator;
