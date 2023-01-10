import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { WebSocketContext } from "../../../context/WebSocketContext";

import { useAppSelector } from "../../../redux/hooks";
import { ChatMessage } from "../../../screen/app/MessageScreen";
type MessageReplyPropsType = {
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  chatId?: string;
};
const MessageReply = ({ setMessages, chatId }: MessageReplyPropsType) => {
  const [message, setMessage] = React.useState<string>("");
  const user = useAppSelector((s) => s.auth.user);
  const socket = React.useContext(WebSocketContext);
  const sendMessage = () => {
    if (message) {
      setMessages((messages) => [...messages]);
      socket.emit("newMessage", {
        createdMessage: {
          from: user?._id,
          MessageText: message,
        },
        ChatId: chatId,
      });
      //console.log("gönderildi");
    }

    setMessage("");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "gray",
        paddingHorizontal: 5,
        paddingVertical: 2,
      }}
    >
      <TextInput
        style={{ height: 40, fontSize: 20 }}
        placeholder="Send Message..."
        onChangeText={setMessage}
        onSubmitEditing={sendMessage}
        value={message}
      ></TextInput>
      <Button title="Send" onPress={sendMessage} color="#ff5864"></Button>
    </View>
  );
};

export default MessageReply;

const styles = StyleSheet.create({});
