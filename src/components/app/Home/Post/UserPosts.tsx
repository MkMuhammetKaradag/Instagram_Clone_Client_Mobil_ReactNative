import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PostType } from "../../../../api/app/appApiTypes";
import UserPostCard from "./UserPostCard";
type UserPostsProps = {
  userPosts: PostType[];
  setUserPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};
const UserPosts = ({ userPosts, setUserPosts }: UserPostsProps) => {
  return (
    <View>
      {userPosts.map((userPost) => (
        <UserPostCard key={userPost._id} userPost={userPost}></UserPostCard>
      ))}
    </View>
  );
};

export default UserPosts;

const styles = StyleSheet.create({});
