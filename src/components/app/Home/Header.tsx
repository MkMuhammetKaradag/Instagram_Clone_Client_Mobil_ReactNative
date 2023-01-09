import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "../../../navigation/AuthStack";

import { getLogout } from "../../../api/auth/authApi";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/auth/AuthSlice";
import { AppScreenNavigationProp } from "../../../navigation/AppStack";
const Header = () => {
  const navigation = useNavigation<AppScreenNavigationProp["navigation"]>();
  const dispact = useAppDispatch();
  const userLogOut = () => {
    getLogout()
      .then((res) => {
        dispact(setUser(res.data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          userLogOut();
        }}
      >
        <Image
          style={styles.logo}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWajvAbXeRYKkhBJ0xYB61FV6_tY65rf1gTQ&usqp=CAU",
          }}
        ></Image>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Feather name="plus-square" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            name="heart"
            size={25}
            style={{ marginLeft: 10 }}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={25}
            style={{ marginLeft: 10 }}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: "contain",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unreadBadge: {
    backgroundColor: "#ff3250",
    position: "absolute",
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    zIndex: 1,
    justifyContent: "center",
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});
