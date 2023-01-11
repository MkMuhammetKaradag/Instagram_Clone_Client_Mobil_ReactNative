// The following packages need to be installed using the following commands:
// expo install expo-camera
// expo install expo-media-library
// expo install expo-sharing
// expo install expo-av

import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import { ResizeMode, Video } from "expo-av";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { CameraRecordingOptions } from "expo-camera/build/Camera.types";
import { FileType } from "../../../screen/app/CreatePostScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type TakeVideoPropsType = {
  setFile: React.Dispatch<React.SetStateAction<FileType | undefined>>;
  setPostCreatedType: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function TakeVideo({
  setFile,
  setPostCreatedType,
}: TakeVideoPropsType) {
  let cameraRef = useRef<Camera>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
  const [hasMicrophonePermission, setHasMicrophonePermission] =
    useState<boolean>();

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      console.log(cameraPermission.status);
      setHasCameraPermission(
        cameraPermission.status === MediaLibrary.PermissionStatus.GRANTED
      );
      setHasMicrophonePermission(
        microphonePermission.status === MediaLibrary.PermissionStatus.GRANTED
      );
    })();
  }, []);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Requestion permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>;
  }

  let recordVideo = () => {
    setIsRecording(true);
    let options: CameraRecordingOptions = {
      quality: "480p",
      maxDuration: 10,
      mute: false,
      maxFileSize: 500000,
    };

    cameraRef.current?.recordAsync(options).then((recordedVideo) => {
      setIsRecording(false);
      let localUri = recordedVideo?.uri;
      let filename = localUri?.split("/").pop();

      // Infer the type of the video
      let match = /\.(\w+)$/.exec(filename || "");
      let type = match ? `video/${match[1]}` : `video`;
      //   console.log({ uri: localUri || "", name: filename, type });

      setFile({ uri: localUri || "", name: filename, type });
      setPostCreatedType(undefined);
    });
  };

  let stopRecording = () => {
    setIsRecording(false);
    cameraRef.current?.stopRecording();
  };

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        {/* <Button
          title={isRecording ? "Stop Recording" : "Record Video"}
          onPress={isRecording ? stopRecording : recordVideo}
        /> */}
        <TouchableOpacity
          style={{ borderRadius: 30 }}
          onPress={isRecording ? stopRecording : recordVideo}
        >
          <MaterialCommunityIcons
            style={{ borderRadius: 30 }}
            name="camera-iris"
            size={40}
            color={isRecording ? "red" : "white"}
          />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  buttonContainer: {
    position: "absolute",

    bottom: 0,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});
