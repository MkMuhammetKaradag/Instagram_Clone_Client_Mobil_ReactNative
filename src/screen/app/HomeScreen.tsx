import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { getLogout } from "../../api/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/auth/AuthSlice";
import Header from "../../components/app/Home/Header";
import Stories from "../../components/app/Home/Stories";

const HomeScreen = () => {


  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.button} onPress={() => userLogOut()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity> */}
      <Header></Header>
      <ScrollView>
        <Stories></Stories>
        <Text style={{ color: "#fff" }}>Test</Text>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 20,
  },
  button: {
    backgroundColor: "#9acaf7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
});
