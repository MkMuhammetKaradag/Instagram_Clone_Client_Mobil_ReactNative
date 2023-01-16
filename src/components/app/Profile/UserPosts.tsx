import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { UserPostType } from "../../../api/app/appApiTypes";
import PostCard from "./PostCard";

type UserPostsPropsType = {
  userPosts: UserPostType[];
};

const UserPosts = ({ userPosts }: UserPostsPropsType) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>


      <FlatList
        data={userPosts}
        nestedScrollEnabled={true}
        renderItem={({ item }) => <PostCard post={item}></PostCard>}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default UserPosts;

const styles = StyleSheet.create({});
