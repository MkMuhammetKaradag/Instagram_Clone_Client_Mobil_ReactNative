import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RootNavigator from "./src/navigation/RootNavigator";
import InstagramMobilProvider from "./src/redux/InstagramMobilProvider";
import { useAppSelector } from "./src/redux/hooks";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <InstagramMobilProvider>
      <RootNavigator></RootNavigator>
    </InstagramMobilProvider>
  );
}
