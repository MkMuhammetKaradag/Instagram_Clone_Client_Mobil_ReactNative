import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FileType } from "../../../screen/app/CreatePostScreen";

type SelectPhotoPropsType = {
  setFile: React.Dispatch<React.SetStateAction<FileType | undefined>>;
  setPostCreatedType: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const SelectPhoto = ({ setFile, setPostCreatedType }: SelectPhotoPropsType) => {
  //   const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();

  React.useEffect(() => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    })
      .then((result) => {
        if (!result.canceled) {
          //   console.log(result.assets[0].type);

          let filename = result.assets[0].uri?.split("/").pop();
          let match = /\.(\w+)$/.exec(result.assets[0].fileName || "");
          let type = match
            ? `${result.assets[0].type}/${match[1]}`
            : `${result.assets[0].type}`;
          //   console.log(result);
          //   if (result.assets[0].fileSize && result.assets[0].fileSize < 500000) {
          setFile({
            uri: result.assets[0].uri,
            name: filename,
            type,
          });
          //   }

          //   setImage(result.assets[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPostCreatedType(undefined);
      });
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      //   console.log(result.assets[0].type);

      let filename = result.assets[0].uri?.split("/").pop();
      let match = /\.(\w+)$/.exec(result.assets[0].fileName || "");
      let type = match
        ? `${result.assets[0].type}/${match[1]}`
        : `${result.assets[0].type}`;
      //   console.log(result);
      //   if (result.assets[0].fileSize && result.assets[0].fileSize < 500000) {
      setFile({
        uri: result.assets[0].uri,
        name: filename,
        type,
      });
      //   }

      //   setImage(result.assets[0]);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "black",
      }}
    >
      <Text>Hello</Text>
    </View>
  );
};

export default SelectPhoto;
