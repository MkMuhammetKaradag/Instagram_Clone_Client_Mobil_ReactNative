import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { PostType } from "../../../../api/app/appApiTypes";
import { Video, AVPlaybackStatus } from "expo-av";
import { Playback } from "expo-av/build/AV";
import { ResizeMode } from "expo-av/build/Video.types";
import UserPostHeader from "./UserPostHeader";
import UserPostFooter from "./UserPostFooter";
type UserPostCardProps = {
  userPost: PostType;
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const UserPostCard = ({ userPost }: UserPostCardProps) => {
  //   console.log(userPost);
  const video = React.useRef<Playback>(null);
  const [status, setStatus] = React.useState<AVPlaybackStatus>();
  return (
    <View style={styles.container}>
      <UserPostHeader></UserPostHeader>
      {userPost.type === "IMAGE" && (
        <Image
          style={styles.image}
          source={{
            uri: userPost.image_url ? userPost.image_url : " ",
          }}
        ></Image>
      )}
      {userPost.type === "VIDEO" && (
        <View
          style={{
            position: "relative",
          }}
        >
          <Video
            //@ts-ignore   //not-değiştirilcek!!!!!.
            ref={video}
            style={styles.video}
            source={{
              uri: userPost.video_url ? userPost.video_url : " ",
            }}
            useNativeControls={false}
            resizeMode={ResizeMode.STRETCH}
            isLooping={true}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            onPress={() =>
              status?.isLoaded && status.isPlaying
                ? video?.current?.pauseAsync()
                : video?.current?.playAsync()
            }
          >
            {/* <Button
              title={status?.isLoaded && status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status?.isLoaded && status.isPlaying
                  ? video?.current?.pauseAsync()
                  : video?.current?.playAsync()
              }
            /> */}
          </TouchableOpacity>
        </View>
      )}
      <Text style={{ color: "white" }}>{userPost.description}</Text>
      <UserPostFooter></UserPostFooter>
    </View>
  );
};

export default UserPostCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  image: {
    alignSelf: "center",
    width: windowWidth,
    maxWidth: windowWidth,
    height: 400,
    maxHeight: windowHeight * 0.7,
    resizeMode: "stretch",
  },
  video: {
    alignSelf: "center",
    width: windowWidth,
    height: windowHeight * 0.9,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
