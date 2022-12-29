import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { Feather } from "@expo/vector-icons";
const UserPostFooter = () => {
  return (
    <View style={styles.footerContainer}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Feather
          style={{ marginLeft: 10 }}
          name="heart"
          size={24}
          color="white"
        />
        <Feather
          style={{ marginLeft: 10 }}
          name="message-circle"
          size={24}
          color="white"
        />
        <Feather
          style={{ marginLeft: 10 }}
          name="send"
          size={24}
          color="white"
        />
      </View>
      <View>
        <Feather name="bookmark" size={24} color="white" />
      </View>
    </View>
  );
};

export default UserPostFooter;

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",

    width: windowWidth,
    height: windowHeight * 0.07,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
