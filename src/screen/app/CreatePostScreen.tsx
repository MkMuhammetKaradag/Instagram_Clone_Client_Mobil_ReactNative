import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
// import StepIndicator from "react-native-step-indicator";
import TakeVideo from "../../components/app/CreatePost/TakeVideo";
import TakePhoto from "../../components/app/CreatePost/TakePhoto";
// import { CameraCapturedPicture } from "expo-camera/src/Camera.types";
// import { string } from "yup";
import { postUserPostCreated } from "../../api/app/appApi";
import StepIndicator from "../../components/app/CreatePost/StepIndicator";
import SelectPhoto from "../../components/app/CreatePost/SelectPhoto";
import { ResizeMode, Video } from "expo-av";
import SelectType from "../../components/app/CreatePost/SelectType";
import InputPostInfo from "../../components/app/CreatePost/InputPostInfo";
import ShowMedia from "../../components/app/CreatePost/ShowMedia";

// const firstIndicatorStyles = {
//   stepIndicatorSize: 30,
//   currentStepIndicatorSize: 40,
//   separatorStrokeWidth: 3,
//   currentStepStrokeWidth: 5,
//   separatorFinishedColor: "#4aae4f",
//   separatorUnFinishedColor: "#a4d4a5",
//   stepIndicatorFinishedColor: "#4aae4f",
//   stepIndicatorUnFinishedColor: "#a4d4a5",
//   stepIndicatorCurrentColor: "#ffffff",
//   stepIndicatorLabelFontSize: 15,
//   currentStepIndicatorLabelFontSize: 15,
//   stepIndicatorLabelCurrentColor: "#000000",
//   stepIndicatorLabelFinishedColor: "#ffffff",
//   stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
//   labelColor: "#666666",
//   labelSize: 12,
//   currentStepLabelColor: "#4aae4f",
// };

export type FileType = {
  uri: string;
  name?: string;
  type: string;
};

const CreatePostScreen = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hashtags, setHashtags] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [file, setFile] = React.useState<FileType>();
  const createdPostSubmit = () => {
    if (file && description.length > 0 && hashtags.length > 0) {
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name || "",
        type: file.type,
      } as unknown as Blob);
      formData.append("image_url", "");
      formData.append("video_url", "");
      formData.append("description", description);
      formData.append("hashtags", hashtags.toString());
      formData.append("type", file?.type.includes("video") ? "VIDEO" : "IMAGE");
      // console.log(formData);
      setIsLoading(true);
      postUserPostCreated(formData)
        .then((res) => {
          setFile(undefined);
          setDescription("");
          setHashtags("");
        })
        .catch((err) => console.log(err))
        .finally(() => {
          console.log("true-false loading");
          setIsLoading(false);
        });
    }
  };
  if (isLoading) {
    return <Text style={{ color: "#fff", marginTop: 30 }}>Paylaşılıyor</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={30}
    >
      <SafeAreaView style={styles.container}>
        <StepIndicator
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></StepIndicator>

        {currentPage == 0 && (
          <SelectType file={file} setFile={setFile}></SelectType>
        )}
        {currentPage == 1 && (
          <InputPostInfo
            file={file}
            hashtags={hashtags}
            setHashtags={setHashtags}
            description={description}
            setDescription={setDescription}
          ></InputPostInfo>
        )}
        {currentPage == 2 && (
          <View>
            <ShowMedia file={file}></ShowMedia>
            <View>
              <Text>{description}</Text>
              <Text>{hashtags}</Text>
            </View>
            <Button onPress={createdPostSubmit} title="Share"></Button>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "black",
  },
});
