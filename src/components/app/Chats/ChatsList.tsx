import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import { AppScreenNavigationProp } from "../../../navigation/AppStack";

const ChatsList = () => {
  const chats = useAppSelector((s) => s.user.chats);
  const user = useAppSelector((s) => s.auth.user);
  const navigation = useNavigation<AppScreenNavigationProp["navigation"]>();
  const newChats =
    chats &&
    chats.map(({ users, _id }) => ({
      _id: _id,
      users:
        users &&
        users.filter(
          (chatUser) => chatUser.userNickName !== user?.userNickName
        ),
    }));
  return (
    <View>
      {newChats &&
        newChats.map((chat) => (
          <TouchableOpacity
            key={chat._id}
            onPress={() => navigation.navigate("Message", { chatId: chat._id })}
          >
            <Text>{chat.users[0].userNickName}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default ChatsList;

const styles = StyleSheet.create({});
