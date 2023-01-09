import { StyleSheet, Text, View } from "react-native";
import React from "react";
type SenderMessageProps = {
  messageText: string;
};
const SenderMessage = ({ messageText }: SenderMessageProps) => {
  return (
    <View
      style={{
        flex: 1,
        maxWidth: "90%",
        marginHorizontal: 6,
        marginVertical: 4,
        alignSelf: "flex-end",
      }}
    >
      <Text
        style={{
          color: "#fff",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderTopLeftRadius: 15,
          backgroundColor: "gray",
          padding: 10,
          alignItems: "flex-end",
        }}
      >
        {messageText}
      </Text>
    </View>
  );
};

export default SenderMessage;

const styles = StyleSheet.create({});
