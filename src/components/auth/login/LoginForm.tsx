import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "../../../navigation/AuthStack";

const LoginForm = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const styles = styling(true);
  return (
    <View>
      <View
        style={[
          styles.inputField,
          {
            borderColor: email.length < 1 ? "#ccc" : "red",
          },
        ]}
      >
        <TextInput
          placeholder="Phone Number,username or Email"
          placeholderTextColor={"#444"}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          //   onBlur={handleBlur("email")}
          //   onChangeText={handleChange("email")}
          value={email}
          onChangeText={(e) => setEmail(e)}
        ></TextInput>
      </View>
      <View
        style={[
          styles.inputField,
          {
            borderColor: password.length < 1 ? "#ccc" : "red",
          },
        ]}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor={"#444"}
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry={true}
          //   onBlur={handleBlur("password")}
          //   onChangeText={handleChange("password")}
          value={password}
          onChangeText={(e) => setPassword(e)}
        ></TextInput>
      </View>
      <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
        <Text style={{ color: "#6bb0f5" }}>Forgot password</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        disabled={!true}
        onPress={() => console.log("naber")}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={{ color: "#ffff" }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={{ color: "#6bb0f5" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

const styling = (isValid: boolean) =>
  StyleSheet.create({
    inputField: {
      borderRadius: 5,
      justifyContent: "center",
      padding: 12,
      backgroundColor: "#FAFAFA",
      marginBottom: 10,
      borderWidth: 1,
    },
    wrapper: {
      marginTop: 50,
    },
    button: {
      backgroundColor: isValid ? "#0096f6" : "#9acaf7",
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
    signUpContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      marginTop: 50,
    },
  });
