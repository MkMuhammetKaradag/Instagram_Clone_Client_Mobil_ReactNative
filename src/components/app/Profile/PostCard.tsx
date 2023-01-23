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
import { useNavigation } from "@react-navigation/native";
import { AppScreenNavigationProp } from "../../../navigation/AppStack";
type PostCardPropsType = {
  post: UserPostType;
};
const screenWidth = Dimensions.get("window").width;
const PostCard = ({ post }: PostCardPropsType) => {
  const navigation = useNavigation<AppScreenNavigationProp["navigation"]>();

  return (
    <View
      style={{
        width: screenWidth * 0.32,
        height: screenWidth * 0.32,
        flexDirection: "column",
        margin: 2,
        // backgroundColor: "red",
      }}
    >
      {post.type == "VIDEO" && (
        <TouchableOpacity
          style={{ width: "100%", height: "100%", position: "relative" }}
          onPress={() => navigation.navigate("Comment", { userPost: post })}
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
          onPress={() => navigation.navigate("Comment", { userPost: post })}
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
