import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { FileType } from "../../../screen/app/CreatePostScreen";
import { ResizeMode, Video } from "expo-av";
import ShowMedia from "./ShowMedia";
type InputPostInfoPropsType = {
  file?: FileType;
  hashtags: string;
  setHashtags: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  description: string;
};
const InputPostInfo = ({
  file,
  hashtags,
  setHashtags,
  setDescription,
  description,
}: InputPostInfoPropsType) => {
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, height: "100%" }}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.inner}>
        <ShowMedia file={file} postCreated={false}></ShowMedia>
        <View
          style={{
            display: "flex",
            width: "100%",
            height: "20%",
            alignItems: "center",
          }}
        >
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            placeholderTextColor={"white"}
            value={description}
            placeholder="Description"
          ></TextInput>
          <TextInput
            value={hashtags}
            onChangeText={setHashtags}
            style={styles.input}
            placeholderTextColor={"white"}
            placeholder="Hastag"
          ></TextInput>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputPostInfo;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 500,
    alignSelf: "stretch",
  },
  inner: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "black",
    alignItems: "center",
  },
  input: {
    height: 40,
    backgroundColor: "white",

    width: "80%",
    marginBottom: 10,
    borderRadius: 7,
    paddingHorizontal: 5,
  },
});
