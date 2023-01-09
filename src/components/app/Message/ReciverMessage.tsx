import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
type ReciverMessageProps = {
  messageText: string;
  userProfilePicture: string | null;
};
const ReciverMessage = ({
  messageText,
  userProfilePicture,
}: ReciverMessageProps) => {
  return (
    <View
      style={{
        flex: 1,

        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginHorizontal: 6,
        marginVertical: 4,
        alignSelf: "flex-start",
        position: "relative",
      }}
    >
      <Image
        style={{
          width: 35,
          height: 35,
          borderRadius: 50,
          position: "absolute",
          left: 0,
        }}
        source={{
          uri: userProfilePicture ? userProfilePicture : "",
        }}
      />

      <Text
        style={{
          color: "#fff",
          backgroundColor: "purple",
          padding: 10,
          marginLeft: 30,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderTopRightRadius: 15,
        }}
      >
        {messageText}
      </Text>
    </View>
  );
};

export default ReciverMessage;

const styles = StyleSheet.create({});
