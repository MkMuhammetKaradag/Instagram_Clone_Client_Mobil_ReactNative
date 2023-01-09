import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { getChats } from "../../api/app/appApi";
import { setChats } from "../../redux/user/UserSlice";
import { useAppDispatch } from "../../redux/hooks";
import ChatsList from "../../components/app/Chats/ChatsList";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ChatsScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  React.useEffect(() => {
    getChats()
      .then((res) => {
        if (res.data.chats) {
          dispatch(setChats(res.data.chats));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View>
      <View
        style={{
          backgroundColor: "black",
          marginTop: 20,
          display: "flex",
          flexDirection: "row",

          alignItems: "center",
          paddingHorizontal: 10,
          height: 45,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: "red" }}
        >
          <AntDesign name="arrowleft" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: "#fff", marginLeft: 10 }}>User Nick Name</Text>
      </View>
      <Text>Chat List</Text>
      <ChatsList></ChatsList>
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
