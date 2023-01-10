import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import StepIndicator from "react-native-step-indicator";
import TakeVideo from "../../components/app/CreatePost/TakeVideo";
import TakePhoto from "../../components/app/CreatePost/TakePhoto";
import { CameraCapturedPicture } from "expo-camera/src/Camera.types";
import { string } from "yup";
import { postUserPostCreated } from "../../api/app/appApi";
const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: "#4aae4f",
  separatorUnFinishedColor: "#a4d4a5",
  stepIndicatorFinishedColor: "#4aae4f",
  stepIndicatorUnFinishedColor: "#a4d4a5",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#000000",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
  labelColor: "#666666",
  labelSize: 12,
  currentStepLabelColor: "#4aae4f",
};

export type FileType = {
  uri: string;
  name?: string;
  type: string;
};

const CreatePostScreen = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [hashtags, setHashtags] = React.useState<readonly string[]>([
    "reactnative",
    "expo",
  ]);
  const [description, setDescription] = React.useState<string>(
    "muhammet deneme react  native"
  );
  const [file, setFile] = React.useState<FileType>();
  const createdPostSubmit = () => {
    if (file && description && hashtags.length > 0) {
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
      postUserPostCreated(formData)
        .then((res) => {
          setFile(undefined);
          setDescription("");
          setHashtags([]);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          console.log("true-false loading");
        });
    }
  };
  const renderLabel = ({
    position,
    label,
    currentPosition,
  }: {
    position: number;
    stepStatus: string;
    label: string;
    currentPosition: number;
  }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    );
  };
  const onStepPress = (position: number) => {
    setCurrentPage(position);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={firstIndicatorStyles}
          currentPosition={currentPage}
          labels={["as", "asd", "asdf", "asdfg", "asdfgh"]}
          renderLabel={renderLabel}
          onPress={onStepPress}
        />
        <Button onPress={createdPostSubmit} title="gönder"></Button>
      </View>
      <Text>Naber{currentPage}</Text>
      {currentPage == 2 && <TakeVideo setFile={setFile}></TakeVideo>}
      {currentPage == 3 && <TakePhoto setFile={setFile}></TakePhoto>}
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  stepIndicator: {
    marginVertical: 50,
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
