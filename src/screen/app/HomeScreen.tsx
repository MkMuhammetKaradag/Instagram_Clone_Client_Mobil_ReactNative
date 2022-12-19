import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { getLogout } from "../../api/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/auth/AuthSlice";

const HomeScreen = () => {
  const dispact = useAppDispatch();

  const userLogOut = () => {
    getLogout()
      .then((res) => {
        dispact(setUser(res.data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => userLogOut()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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
