import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "../../../navigation/AuthStack";
import { postLogin } from "../../../api/auth/authApi";
import { setUser } from "../../../redux/auth/AuthSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { Formik } from "formik";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import * as Yup from "yup";
interface FormValues {
  email: string;
  password: string;
}

// The type of props MyForm receives
interface MyFormProps {
  dispatch: Dispatch<AnyAction>;
}
const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const InnerForm = ({ dispatch }: MyFormProps) => {
  const styles = styling(true);
  const loginUser = (values: FormValues) => {
    postLogin({
      email: values.email,
      password: values.password,
    })
      .then((res) => dispatch(setUser(res.data.user)))
      .catch((err) => console.log(err));
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => loginUser(values)}
      validationSchema={SignInSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
          <View
            style={[
              styles.inputField,
              {
                borderColor: errors.email && touched.email ? "red" : "#ccc",
                borderWidth: 1,
              },
            ]}
          >
            <TextInput
              placeholder="Phone Number,username or Email"
              placeholderTextColor={"#444"}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              onBlur={handleBlur("email")}
              autoFocus={true}
              value={values.email}
              onChangeText={handleChange("email")}
            ></TextInput>
          </View>
          <View
            style={[
              styles.inputField,
              {
                borderColor:
                  errors.password && touched.password ? "red" : "#ccc",
                borderWidth: 1,
              },
            ]}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"#444"}
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry={true}
              onBlur={handleBlur("password")}
              value={values.password}
              onChangeText={handleChange("password")}
            ></TextInput>
          </View>
          {/* <Button onPress={() => handleSubmit()} title="Submit" /> */}
          <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
            <Text style={{ color: "#6bb0f5" }}>Forgot password</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

const LoginForm = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const styles = styling(true);

  return (
    <>
      <InnerForm dispatch={dispatch}></InnerForm>
      <View style={styles.signUpContainer}>
        <Text style={{ color: "#ffff" }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={{ color: "#6bb0f5" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </>
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
