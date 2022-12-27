import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { USERS } from "../../../data/users";
const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View style={{ alignItems: "center" }} key={index}>
            <Image style={styles.story} source={{ uri: story.image }}></Image>
            <Text style={{ color: "white" }}>
              {story.user.length > 10
                ? story.user.slice(0, 9).toLowerCase() + "..."
                : story.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});
