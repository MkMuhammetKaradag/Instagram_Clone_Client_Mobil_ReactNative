import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { PostUserType } from "../../../../api/auth/authApiType";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type UserPostHeaderProps = {
  owner: PostUserType;
};

const UserPostHeader = ({ owner }: UserPostHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: windowHeight * 0.06,
            height: windowHeight * 0.06,
            borderRadius: 50,
          }}
          source={{
            uri:
              owner.userProfilePicture ||
              "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
          }}
        ></Image>
        <Text style={{ color: "white", marginLeft: 10 }}>
          {owner.userNickName}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </View>
    </View>
  );
};

export default UserPostHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",

    width: windowWidth,
    height: windowHeight * 0.07,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
