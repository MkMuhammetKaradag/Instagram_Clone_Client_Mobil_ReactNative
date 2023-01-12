import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppScreenNavigationProp } from "../../../navigation/AppStack";

const ProfileHeader = () => {
  const user = useAppSelector((s) => s.auth.user);
  const navigation = useNavigation<AppScreenNavigationProp["navigation"]>();
  return (
    <View
      style={{
        marginTop: 30,
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>
      <Text style={{ color: "#fff" }}>{user?.userNickName}</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreatePost")}
          style={{ marginRight: 20 }}
        >
          <Feather name="plus-square" size={25} color="white" />
        </TouchableOpacity>

        <Ionicons name="reorder-three-outline" size={24} color="white" />
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({});
