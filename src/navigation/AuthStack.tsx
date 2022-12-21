import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screen/auth/LoginScreen";
import SignUpScreen from "../screen/auth/SignUpScreen";
import AuthHomeScreen from "../screen/auth/AuthScreen";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  AuthHomeScreen: undefined;
  // Order: {
  //   order: Order;
  // };
};
export type AuthScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "LoginScreen",
  "SignUpScreen"
>;
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AuthHomeScreen"
        component={AuthHomeScreen}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LoginScreen"
        component={LoginScreen}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SignUpScreen"
        component={SignUpScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
