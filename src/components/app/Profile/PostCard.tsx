import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { UserPostType } from "../../../api/app/appApiTypes";
import { Video } from "expo-av";
import { Octicons } from "@expo/vector-icons";
type PostCardPropsType = {
  post: UserPostType;
};
const screenHeight = Dimensions.get("screen").width;
const PostCard = ({ post }: PostCardPropsType) => {
  return (
    <View
      style={{
        width: "32%",
        height: screenHeight * 0.32,
        flexDirection: "column",
        margin: 3,
        // backgroundColor: "red",
      }}
    >
      {post.type == "VIDEO" && (
        <TouchableOpacity
          style={{ width: "100%", height: "100%", position: "relative" }}
          onPress={() => console.log("video")}
        >
          <Video
            style={{ width: "100%", height: "100%" }}
            source={{ uri: post.video_url || "" }}
          ></Video>
          <Octicons
            style={{ position: "absolute", top: 5, right: 5 }}
            name="video"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      )}
      {post.type == "IMAGE" && (
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          onPress={() => console.log("resim")}
        >
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            source={{ uri: post.image_url || "" }}
          ></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({});
