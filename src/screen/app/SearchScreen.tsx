import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { Center, HStack, Skeleton, VStack } from "native-base";

const SearchScreen = () => {
  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <Center w="100%">
        <VStack
          w="100%"
          h="100%"
          maxW="400"
          borderWidth="1"
          // style={{ display: "flex", flexDirection: "row" }}
          space={8}
          overflow="hidden"
          rounded="md"
          _dark={{
            borderColor: "coolGray.500",
          }}
          _light={{
            borderColor: "coolGray.200",
          }}
        >
          <HStack w="100%" space="5">
            <Skeleton w="30%" h="32" />
            <Skeleton w="30%" h="32" />
            <Skeleton w="30%" h="32" />
          </HStack>
          <HStack w="100%" space="5">
            <Skeleton w="30%" h="32" />
            <Skeleton w="30%" h="32" />
            <Skeleton w="30%" h="32" />
          </HStack>
        </VStack>
      </Center>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
