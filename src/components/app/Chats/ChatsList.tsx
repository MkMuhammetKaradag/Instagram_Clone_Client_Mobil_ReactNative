import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import { AppScreenNavigationProp } from "../../../navigation/AppStack";
import { Entypo } from "@expo/vector-icons";
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
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
            onPress={() => navigation.navigate("Message", { chatId: chat._id })}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{
                  uri:
                    chat.users[0].userProfilePicture ||
                    "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
                }}
              ></Image>

              <Text style={{ color: "white", marginLeft: 20 }}>
                {chat.users[0].userNickName}
              </Text>
            </View>
            <View>
              <Entypo name="new-message" size={30} color="white" />
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default ChatsList;

const styles = StyleSheet.create({});
