import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { Feather } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { addPostLike, removePostLike } from "../../../../api/app/appApi";
import { deleteLike, setLike } from "../../../../redux/user/UserSlice";
import { useNavigation } from "@react-navigation/native";
import { AppScreenNavigationProp } from "../../../../navigation/AppStack";

type UserPostFooterProps = {
  postId: string;
  ClickComment: () => void;
};
const UserPostFooter = ({ postId, ClickComment }: UserPostFooterProps) => {
  const likes = useAppSelector((s) => s.user.likes);
  const user = useAppSelector((s) => s.auth.user);
  const navigation = useNavigation<AppScreenNavigationProp["navigation"]>();
  const dispatch = useAppDispatch();
  const addLike = () => {
    addPostLike(postId)
      .then((res) => {
        if (user) {
          // setPostLikes((s) => [...s, user._id]);
          // console.log("postLİke", postLikes);
          dispatch(setLike(postId));
        }
      })
      .catch((err) => console.log(err));
  };
  const removeLike = () => {
    removePostLike(postId)
      .then((res) => {
        if (user) {
          // setPostLikes((s) => {
          //   return s.filter((id) => id != user._id);
          // });
          // console.log("removelike:", postLikes);
          dispatch(deleteLike(postId));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.footerContainer}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Feather
          style={{ marginLeft: 10 }}
          onPress={() => {
            !likes.includes(postId) ? addLike() : removeLike();
          }}
          name="heart"
          size={24}
          color={likes.includes(postId) ? "red" : "white"}
        />
        <Feather
          style={{ marginLeft: 10 }}
          name="message-circle"
          size={24}
          onPress={() => ClickComment()}
          color="white"
        />
        <Feather
          style={{ marginLeft: 10 }}
          name="send"
          size={24}
          color="white"
        />
      </View>
      <View>
        <Feather name="bookmark" size={24} color="white" />
      </View>
    </View>
  );
};

export default UserPostFooter;

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",

    width: windowWidth,
    height: windowHeight * 0.07,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
