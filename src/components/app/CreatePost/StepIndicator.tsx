import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
type StepIndicatorProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};
const StepIndicator = ({ setCurrentPage, currentPage }: StepIndicatorProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.stepIndicator}>
      {/* <StepIndicator
          customStyles={firstIndicatorStyles}
          currentPosition={currentPage}
          labels={["as", "asd", "asdf", "asdfg", "asdfgh"]}
          renderLabel={renderLabel}
          onPress={onStepPress}
        /> */}
      {currentPage < 1 && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="closecircleo" size={24} color="white" />
        </TouchableOpacity>
      )}
      {currentPage > 0 && (
        <TouchableOpacity onPress={() => setCurrentPage((prev) => prev - 1)}>
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
      )}
      {currentPage < 2 && (
        <TouchableOpacity onPress={() => setCurrentPage((prev) => prev + 1)}>
          <AntDesign name="arrowright" size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  stepIndicator: {
    marginVertical: 5,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
