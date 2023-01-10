import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppTab, {
  AppTabScreenNavigationProp,
  TabStackParamList,
} from "./AppTab";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import CommentScreen from "../screen/app/CommentScreen";
import type { StackScreenProps } from "@react-navigation/stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import ChatsScreen from "../screen/app/ChatsScreen";
import MessageScreen from "../screen/app/MessageScreen";
import type { RouteProp } from "@react-navigation/native";
import CreatePostScreen from "../screen/app/CreatePostScreen";
export type AppStackParamList = {
  TabApp: AppTabScreenNavigationProp;
  Comment: undefined;
  Chats: undefined;
  Message: { chatId?: string };
  CreatePost: undefined;

  //   SignUpScreen: undefined;
  //   AuthHomeScreen: undefined;
  // Order: {
  //   order: Order;
  // };
};
export type AppStackNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;

export type MessageScreenRouteProp = RouteProp<AppStackParamList, "Message">;

export type AppScreenNavigationProp = CompositeScreenProps<
  StackScreenProps<AppStackParamList>,
  BottomTabScreenProps<TabStackParamList>
>;
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TabApp"
        component={AppTab}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Comment"
        component={CommentScreen}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Chats"
        component={ChatsScreen}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Message"
        component={MessageScreen}
        initialParams={{ chatId: undefined }}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CreatePost"
        component={CreatePostScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppStack;
