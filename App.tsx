import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RootNavigator from "./src/navigation/RootNavigator";
import InstagramMobilProvider from "./src/redux/InstagramMobilProvider";
import { useAppSelector } from "./src/redux/hooks";
import { socket, WebSocketProvider } from "./src/context/WebSocketContext";
import { NativeBaseProvider } from "native-base";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <InstagramMobilProvider>
      <WebSocketProvider value={socket}>
        <NativeBaseProvider>
          <RootNavigator></RootNavigator>
        </NativeBaseProvider>
      </WebSocketProvider>
    </InstagramMobilProvider>
  );
}
