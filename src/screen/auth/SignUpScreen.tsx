import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import SignUpForm from "./../../components/auth/signUp/SignUpForm";

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={{ height: 150, width: 150 }}
          source={{
            uri: "https://i.pinimg.com/736x/21/d6/7f/21d67f1d6b3be5bb2e39395311c77fc6.jpg",
          }}
        ></Image>
      </View>
      {/* <LoginForm></LoginForm> */}
      <SignUpForm></SignUpForm>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",

    //justifyContent: "center",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});
