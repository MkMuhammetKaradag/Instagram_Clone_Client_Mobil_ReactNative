import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screen/app/HomeScreen";
import SearchScreen from "../screen/app/SearchScreen";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
export type TabStackParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};
export type AppTabScreenNavigationProp =
  BottomTabNavigationProp<TabStackParamList>;
const Tab = createBottomTabNavigator<TabStackParamList>();

export default function AppTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === "Home") {
            return <Entypo name="home" size={24} color={color} />;
          } else if (route.name === "Profile") {
            return <Feather name="settings" size={24} color={color} />;
          } else if (route.name === "Search") {
            return <Ionicons name="search" size={24} color={color} />;
          }

          // You can return any component that you like here!
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
