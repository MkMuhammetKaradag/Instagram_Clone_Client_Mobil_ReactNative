import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { boolean } from "yup/lib/locale";
import { FileType } from "../../../screen/app/CreatePostScreen";
import { ResizeMode, Video } from "expo-av";

type ShowMediaPropsType = {
  file?: FileType;
  postCreated?: boolean;
};

const ShowMedia = ({ file, postCreated = false }: ShowMediaPropsType) => {
  return (
    <View style={{ width: "100%" }}>
      {file && file.type.includes("video") && !postCreated && (
        <Video
          style={styles.video}
          source={{ uri: file.uri }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      )}
      {file && file.type.includes("image") && !postCreated && (
        <Image
          source={{ uri: file.uri }}
          style={{ width: "100%", height: "80%" }}
        />
      )}
      {!file && !postCreated && (
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/d5/19/79/d519791d2ef6f1a5da19aced5a64d701.jpg",
          }}
          style={{ width: "100%", height: "80%" }}
        />
      )}
    </View>
  );
};

export default ShowMedia;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "80%",
    alignSelf: "stretch",
  },
});
