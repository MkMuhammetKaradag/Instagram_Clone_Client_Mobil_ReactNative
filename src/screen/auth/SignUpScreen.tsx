import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { getMe } from "../../api/auth/authApi";

const SignUpScreen = () => {
  const getUser = () => {
    getMe()
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <TouchableOpacity
      style={styles.button}
      disabled={!true}
      onPress={() => getUser()}
    >
      <Text style={styles.buttonText}>Log in</Text>
    </TouchableOpacity>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
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
