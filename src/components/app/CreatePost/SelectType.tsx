import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SelectPhoto from "./SelectPhoto";
import TakePhoto from "./TakePhoto";
import TakeVideo from "./TakeVideo";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { FileType } from "../../../screen/app/CreatePostScreen";
import ShowMedia from "./ShowMedia";
type SelectTypePropsType = {
  file?: FileType;
  setFile: React.Dispatch<React.SetStateAction<FileType | undefined>>;
};
const SelectType = ({ file, setFile }: SelectTypePropsType) => {
  const [postCreatedType, setPostCreatedType] = React.useState<string>();
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <ShowMedia file={file} postCreated={!!postCreatedType}></ShowMedia>
      {postCreatedType == "folder" && (
        <SelectPhoto
          setFile={setFile}
          setPostCreatedType={setPostCreatedType}
        ></SelectPhoto>
      )}
      {postCreatedType == "image" && (
        <TakePhoto
          setFile={setFile}
          setPostCreatedType={setPostCreatedType}
        ></TakePhoto>
      )}
      {postCreatedType == "video" && (
        <TakeVideo
          setFile={setFile}
          setPostCreatedType={setPostCreatedType}
        ></TakeVideo>
      )}
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setPostCreatedType("folder")}>
          <Entypo name="folder-images" size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPostCreatedType("image")}>
          <MaterialCommunityIcons
            name="camera-retake"
            size={35}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPostCreatedType("video")}>
          <FontAwesome name="video-camera" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectType;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "80%",
    alignSelf: "stretch",
  },
  page: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center",
  },
  stepLabel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#999999",
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#4aae4f",
  },
});
