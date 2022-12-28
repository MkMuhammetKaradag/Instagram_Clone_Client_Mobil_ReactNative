import { StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import { PostType } from "../../../../api/app/appApiTypes";
import { Video, AVPlaybackStatus } from "expo-av";
import { Playback } from "expo-av/build/AV";
import { ResizeMode } from "expo-av/build/Video.types";
type UserPostCardProps = {
  userPost: PostType;
};
const UserPostCard = ({ userPost }: UserPostCardProps) => {
  //   console.log(userPost);
  const video = React.useRef<Playback>(null);
  const [status, setStatus] = React.useState<AVPlaybackStatus>();
  return (
    <View>
      {userPost.type === "IMAGE" && (
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={{
            uri: userPost.image_url ? userPost.image_url : " ",
          }}
        ></Image>
      )}
      {userPost.type === "VIDEO" && (
        <View style={styles.container}>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: userPost.video_url ? userPost.video_url : " ",
            }}
            useNativeControls={false}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View style={styles.buttons}>
            <Button
              title={status?.isLoaded && status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status?.isLoaded && status.isPlaying
                  ? video?.current?.pauseAsync()
                  : video?.current?.playAsync()
              }
            />
          </View>
        </View>
      )}
      <Text style={{ color: "white" }}>{userPost.description}</Text>
    </View>
  );
};

export default UserPostCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
