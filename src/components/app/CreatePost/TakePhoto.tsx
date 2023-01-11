import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { CameraCapturedPicture } from "expo-camera/src/Camera.types";
import { FileType } from "../../../screen/app/CreatePostScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type TakePhotoPropsType = {
  setFile: React.Dispatch<React.SetStateAction<FileType | undefined>>;
  setPostCreatedType: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function TakePhoto({
  setFile,
  setPostCreatedType,
}: TakePhotoPropsType) {
  let cameraRef = useRef<Camera>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();

  // const [photo, setPhoto] = useState<CameraCapturedPicture>();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current?.takePictureAsync(options);

    let localUri = newPhoto?.uri;
    let filename = localUri?.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename || "");
    let type = match ? `image/${match[1]}` : `image`;

    setFile({ uri: localUri || "", name: filename, type });
    setPostCreatedType(undefined);
  };

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePic}>
          <MaterialCommunityIcons name="camera-iris" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "80%",
    justifyContent: "center",
    position: "relative",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
