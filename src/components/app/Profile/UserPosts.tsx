import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserPostType } from "../../../api/app/appApiTypes";

type UserPostsPropsType = {
  userPosts: UserPostType[];
};

const UserPosts = ({ userPosts }: UserPostsPropsType) => {
  return (
    <ScrollView>
      {userPosts.map((post) => (
        <Text key={post._id} style={{ color: "#fff", padding: 20 }}>
          {post.description}
        </Text>
      ))}
    </ScrollView>
  );
};

export default UserPosts;

const styles = StyleSheet.create({});
