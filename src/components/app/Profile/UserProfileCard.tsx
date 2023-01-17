import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getUser } from "../../../api/app/appApi";
import { getUserType } from "../../../api/app/appApiTypes";
import { Feather } from "@expo/vector-icons";
type UserPostCardPropsTRype = {
  userNickName?: string;
  userProfilePicture?: string | null;
  userFollowers?: number;
  userFollowUp?: number;
  userPostLength?: number;
};

const UserProfileCard = ({
  userNickName,
  userProfilePicture,
  userFollowers,
  userFollowUp,
  userPostLength,
}: UserPostCardPropsTRype) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<getUserType>();

  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 80, height: 80, borderRadius: 50 }}
          source={{
            uri:
              userProfilePicture ||
              "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
          }}
        ></Image>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff" }}>{userPostLength || 0}</Text>
          <Text style={{ color: "#fff" }}>Gönderi</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff" }}>{userFollowers || 0}</Text>
          <Text style={{ color: "#fff" }}>Takipçi</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff" }}>{userFollowUp || 0}</Text>
          <Text style={{ color: "#fff" }}>Takip</Text>
        </View>
      </View>
      <Text style={{ color: "#fff", marginTop: 20 }}>{userNickName}</Text>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({});
