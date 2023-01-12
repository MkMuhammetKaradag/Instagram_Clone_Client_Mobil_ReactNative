import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileHeader from "../../components/app/Profile/ProfileHeader";
import UserProfileCard from "../../components/app/Profile/UserProfileCard";
import { useRoute } from "@react-navigation/native";
import { UserProfileScreenRouteProp } from "../../navigation/AppStack";

const UserProfileScreen = () => {
  const {
    params: { userNickName },
  } = useRoute<UserProfileScreenRouteProp>();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ProfileHeader></ProfileHeader>
      <UserProfileCard userNickName={userNickName}></UserProfileCard>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({});
