import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const UserPostHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: windowHeight * 0.06,
            height: windowHeight * 0.06,
            borderRadius: 50,
          }}
          source={{
            uri: "https://randomuser.me/api/portraits/men/8.jpg",
          }}
        ></Image>
        <Text style={{ color: "white", marginLeft: 10 }}>User Naber</Text>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </View>
    </View>
  );
};

export default UserPostHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",

    width: windowWidth,
    height: windowHeight * 0.07,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
