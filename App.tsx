import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RootNavigator from "./src/navigation/RootNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
  return <RootNavigator></RootNavigator>;
}
