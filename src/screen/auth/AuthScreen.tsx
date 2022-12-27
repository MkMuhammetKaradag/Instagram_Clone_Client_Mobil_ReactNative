import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { Children, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "../../navigation/AuthStack";

const image = {
  uri: "https://static.cdninstagram.com/rsrc.php/v3/yr/r/fzBXVxs22bH.png",
};
const AuthHomeScreen = () => {
  const [current, setCurrent] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(1));
  const navigation = useNavigation<AuthScreenNavigationProp>();
  useEffect(() => {
    let count = 0;
    const loginPageScreenShotSlider = (): void => {
      if (count == 3) {
        setCurrent(0);
        count = 0;
      } else {
        count++;
        setCurrent((prev) => prev + 1);
      }
      setAnimatedValue(new Animated.Value(0.6));
    };
    loginPageScreenShotSlider();
    let interval = setInterval(loginPageScreenShotSlider, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (current == 4) {
      setCurrent(0);
    }
  }, [current]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [animatedValue]);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View
          style={{
            height: 423,
            width: 200,
            right: 36,
            top: 22,
            position: "absolute",
          }}
        >
          <Animated.Image
            source={require("../../asset/screenshot1.png")}
            style={[
              { width: "100%", height: "100%", position: "absolute" },
              current == 0 ? { opacity: animatedValue } : { opacity: 0 },
            ]}
          ></Animated.Image>
          <Animated.Image
            source={require("../../asset/screenshot2.png")}
            style={[
              { width: "100%", height: "100%", position: "absolute" },
              current == 1 ? { opacity: animatedValue } : { opacity: 0 },
            ]}
          ></Animated.Image>
          <Animated.Image
            source={require("../../asset/screenshot3.png")}
            style={[
              { width: "100%", height: "100%", position: "absolute" },
              current == 2 ? { opacity: animatedValue } : { opacity: 0 },
            ]}
          ></Animated.Image>
          <Animated.Image
            source={require("../../asset/screenshot4.png")}
            style={[
              { width: "100%", height: "100%", position: "absolute" },
              current == 3 ? { opacity: animatedValue } : { opacity: 0 },
            ]}
          ></Animated.Image>
        </View>
      </ImageBackground>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 500,
  },
  buttonContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginBottom: 10,
    backgroundColor: "#0096f6",
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
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
