import * as React from "react";
import { Image, Text, View } from "react-native";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screen/app/HomeScreen";
import SearchScreen from "../screen/app/SearchScreen";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { useAppSelector } from "../redux/hooks";
import UserProfileScreen from "../screen/app/UserProfileScreen";

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
  MyProfile: { userNickName?: string };
};

export type AppTabScreenNavigationProp =
  BottomTabNavigationProp<TabStackParamList>;
const Tab = createBottomTabNavigator<TabStackParamList>();

export default function AppTab() {
  const user = useAppSelector((s) => s.auth.user);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          if (route.name === "Home") {
            return <Entypo name="home" size={24} color={color} />;
          } else if (route.name === "MyProfile") {
            return (
              <Image
                style={{
                  width: !focused ? 30 : 34,
                  height: !focused ? 30 : 34,
                  borderRadius: 50,
                  borderColor: color,
                  borderWidth: !focused ? 0 : 2,
                }}
                source={{
                  uri:
                    user?.userProfilePicture ||
                    "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
                }}
              ></Image>
            );
          } else if (route.name === "Search") {
            return <Ionicons name="search" size={24} color={color} />;
          }

          // You can return any component that you like here!
        },
        tabBarActiveTintColor: "#ef406f",
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
      <Tab.Screen
        // initialParams={{ userNickName: user?.userNickName }}
        name="MyProfile"
        initialParams={{ userNickName: undefined }}
        component={UserProfileScreen}
      />
    </Tab.Navigator>
  );
}
