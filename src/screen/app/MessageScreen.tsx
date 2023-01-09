import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  AppScreenNavigationProp,
  AppStackNavigationProp,
  MessageScreenRouteProp,
} from "../../navigation/AppStack";
import { useRoute } from "@react-navigation/native";
import { WebSocketContext } from "../../context/WebSocketContext";
import { getChatMessages } from "../../api/app/appApi";
import Messages from "../../components/app/Message/Messages";
import MessageReply from "../../components/app/Message/MessageReply";
export type ChatMessage = {
  _id: string;
  from: {
    userProfilePicture: string | null;
    _id: string;
    userNickName: string;
  };
  MessageText: string;
  created_at: string;
  updatedAt: string;
};
type MessagePayload = {
  message: ChatMessage;
  type: string;
};
const MessageScreen = () => {
  const {
    params: { chatId },
  } = useRoute<MessageScreenRouteProp>();
  const socket = React.useContext(WebSocketContext);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);

  React.useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("connection", () => {
      console.log("connection!");
    });
    socket.on("disconnect", (reason) => {
      console.log("disconnect");
    });
    socket.on("onMessage", (newMessage: MessagePayload) => {
      console.log("new messaga", newMessage);
      setMessages((prev) => [...prev, newMessage.message]);
    });
    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  }, [socket]);
  React.useEffect(() => {
    socket.emit("join", chatId);
    getChatMessages(chatId as string).then((res) => {
      if (res.data.messages.Messages) {
        setMessages(res.data.messages.Messages);
      }
    });
    // console.log("asas", chatId);
  }, [chatId]);
  // console.log(messages);
  return (
    <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
      >
        <Messages messages={messages}></Messages>
        <MessageReply setMessages={setMessages} chatId={chatId}></MessageReply>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
