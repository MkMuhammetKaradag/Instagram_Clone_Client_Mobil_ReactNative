import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { PostUserType } from "../../../../api/auth/authApiType";
import { useNavigation } from "@react-navigation/native";
import { AppScreenNavigationProp } from "../../../../navigation/AppStack";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type UserPostHeaderProps = {
  owner: PostUserType;
};

const UserPostHeader = ({ owner }: UserPostHeaderProps) => {
  const navigation = useNavigation<AppScreenNavigationProp["navigation"]>();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("UserProfile", { userNickName: owner.userNickName })
        }
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
      </TouchableOpacity>
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
