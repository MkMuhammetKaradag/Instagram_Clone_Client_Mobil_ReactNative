import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { Formik } from "formik";
import { AuthScreenNavigationProp } from "../../../navigation/AuthStack";
import { SignupType } from "../../../api/auth/authApiType";
import { postSignup } from "../../../api/auth/authApi";

const SignUpForm = () => {
  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An Email is required"),
    userNickName: Yup.string()
      .required("A UserName is required")
      .min(3, "Your userName hat to have least 2 chareacters"),
    password: Yup.string()
      .required()
      .min(6, "Your Password hat to have least 6 chareacters")
      .max(20, "Too Long!"),
  });
  const navigation = useNavigation<AuthScreenNavigationProp>();
  //   const getRandomProfilePicture = async () => {
  //     const response = await fetch("https://randomuser.me/api");
  //     const data = await response.json();
  //     return data.results[0].picture.large;
  //   };

  const onSignUp = async (values: SignupType) => {
    postSignup(values)
      .then((res) => {
        if (res.data) {
          navigation.navigate("LoginScreen");
        }
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        Alert.alert(
          "😎 My  Lord ...",
          errorMessage + "\n\n...what would you like  to do nex 👀",
          [
            {
              text: "Ok",
              onPress: () => console.log("ok"),
              style: "cancel",
            },
            {
              text: "Sign Up",
              onPress: () => navigation.navigate("LoginScreen"),
              style: "default",
            },
          ]
        );
      });
  };

  return (
    <View style={styles().wrapper}>
      <Formik
        initialValues={{ email: "", userNickName: "", password: "" }}
        onSubmit={(values) => {
          onSignUp(values);
        }}
        validationSchema={SignUpFormSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <Text style={{ color: "white" }}>
              {isValid ? "aaaaaaaaaaaaaaaaaaa" : "vbbbbbbbbbbbbbbbbbbb"}
            </Text>
            <View
              style={[
                styles().inputField,
                {
                  borderColor: errors.email && touched.email ? "red" : "#ccc",
                },
              ]}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor={"#444"}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                value={values.email}
              ></TextInput>
            </View>
            <View
              style={[
                styles().inputField,
                {
                  borderColor:
                    errors.userNickName && touched.userNickName
                      ? "red"
                      : "#ccc",
                },
              ]}
            >
              <TextInput
                placeholder="userNickName"
                placeholderTextColor={"#444"}
                autoCapitalize="none"
                onBlur={handleBlur("userNickName")}
                onChangeText={handleChange("userNickName")}
                value={values.userNickName}
              ></TextInput>
            </View>
            <View
              style={[
                styles().inputField,
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
                onChangeText={handleChange("password")}
                value={values.password}
              ></TextInput>
            </View>
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#6bb0f5" }}>Forgot password</Text>
            </View>

            <TouchableOpacity
              style={styles(isValid).button}
              disabled={!isValid}
              onPress={() => handleSubmit()}
            >
              <Text style={styles().buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles().signUpContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={{ color: "#6bb0f5" }}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm;

const styles = (isValid: boolean = true) =>
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
