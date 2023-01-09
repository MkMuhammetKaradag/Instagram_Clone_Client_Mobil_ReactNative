import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { ChatMessage } from "../../../api/app/appApi";
import { useAppSelector } from "../../../redux/hooks";
import ReciverMessage from "./ReciverMessage";
import SenderMessage from "./SenderMessage";
type MessagesProps = {
  messages: ChatMessage[];
};
const Messages = ({ messages }: MessagesProps) => {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FlatList
        data={messages.reverse()}
        style={{ paddingHorizontal: 10, marginBottom: 10 }}
        inverted={true}
        keyExtractor={(item) => item._id}
        renderItem={({ item: message }) =>
          message.from._id !== user?._id ? (
            <ReciverMessage
              key={message._id}
              messageText={message.MessageText}
              userProfilePicture={message.from.userProfilePicture}
            ></ReciverMessage>
          ) : (
            <SenderMessage
              key={message._id}
              messageText={message.MessageText}
            ></SenderMessage>
          )
        }
      ></FlatList>
    </TouchableWithoutFeedback>
  );
};

export default Messages;

const styles = StyleSheet.create({});
