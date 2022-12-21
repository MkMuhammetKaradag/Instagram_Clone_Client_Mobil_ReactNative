import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import React, { Children, useEffect, useRef, useState } from "react";

const image = {
  uri: "https://static.cdninstagram.com/rsrc.php/v3/yr/r/fzBXVxs22bH.png",
};
const AuthHomeScreen = () => {
  const [current, setCurrent] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(1));
  useEffect(() => {
    let count = 0;
    const loginPageScreenShotSlider = (): void => {
      // Animated.timing(animatedValue, {
      //   toValue: 0,
      //   duration: 500,
      //   useNativeDriver: true,
      // }).start(() => {
      //   Animated.timing(animatedValue, {
      //     toValue: 1,
      //     duration: 500,
      //     useNativeDriver: true,
      //   }).start();
      // });
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
            // backgroundColor: "red",
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
    </View>
  );
};

export default AuthHomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 500,
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
