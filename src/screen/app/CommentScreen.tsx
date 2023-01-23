import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Button,
  Animated,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { CommentScreenRouteProp } from "../../navigation/AppStack";
import {
  addPostLike,
  getCommentsFromPost,
  postComment,
  removePostLike,
} from "../../api/app/appApi";
import MultiTapOverlay from "../../components/MultiTapOverlay";
import { postCommentType } from "../../api/app/appApiTypes";
import { NULL_URL } from "../../api/url";
import { AntDesign } from "@expo/vector-icons";
import { Input, Stack } from "native-base";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteLike, setLike } from "../../redux/user/UserSlice";

const CommentScreen = () => {
  const {
    params: { userPost },
  } = useRoute<CommentScreenRouteProp>();

  const [comments, setComments] = React.useState<postCommentType[]>([]);
  const [isLoader, setIsLoader] = React.useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const likes = useAppSelector((s) => s.user.likes);
  const [commentInput, setCommentInput] = React.useState("");
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    getCommentsFromPost({
      postId: userPost?._id,
      pageNumber: Math.ceil(comments.length / 10 + 1),
    })
      .then((res) => {
        setComments(res.data.comments);
        setIsLoader(
          res.data.comments.length % 10 === 0 && res.data.comments.length != 0
        );
      })
      .catch((err) => console.log(err));
  }, []);
  const fetchData = () => {
    if (comments.length % 10 === 0 && userPost) {
      // console.log(Math.ceil(comments.length / 10 + 1));
      getCommentsFromPost({
        postId: userPost._id,
        pageNumber: Math.ceil(comments.length / 10 + 1),
      })
        .then((res) => {
          setComments((prev) => [...prev, ...res.data.comments]);
          setIsLoader(res.data.comments.length % 10 === 0);
        })
        .catch((err) => console.log(err));
      // }, 1500);
    }
  };

  const addComment = () => {
    if (userPost && user) {
      postComment(userPost._id, { description: commentInput })
        .then((res) => {
          if (res.data.comments) {
            if (comments.length % 10 !== 0 || res.data.comments.length === 1) {
              setComments((prev) => [
                ...prev,
                {
                  _id: res.data.comments[res.data.comments.length - 1],
                  description: commentInput,
                  user: {
                    _id: user._id,
                    userProfilePicture: user.userProfilePicture,
                    userNickName: user.userNickName,
                  },
                },
              ]);
            }
            // console.log(res.data.comments);
            setCommentInput("");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const firstOpacity = React.useRef(new Animated.Value(0)).current;
  const onDoubleClick = () => {
    Animated.stagger(1000, [
      Animated.timing(firstOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(firstOpacity, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const addLike = () => {
    if (userPost) {
      addPostLike(userPost?._id)
        .then((res) => {
          if (user) {
            dispatch(setLike(userPost?._id));
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const removeLike = () => {
    if (userPost) {
      removePostLike(userPost?._id)
        .then((res) => {
          if (user) {
            dispatch(deleteLike(userPost?._id));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <FlatList
        data={comments}
        ListFooterComponent={() =>
          isLoader && comments.length > 0 ? (
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity onPress={fetchData}>
                <AntDesign name="pluscircle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : null
        }
        ListHeaderComponent={() => (
          <>
            <MultiTapOverlay
              onLongPress={() => console.log("long")}
              onMultiTaps={() => {
                onDoubleClick();
                !likes.includes(userPost?._id || "") ? addLike() : removeLike();
              }}
            >
              <View
                style={{
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height * 0.5,
                    resizeMode: "cover",
                  }}
                  source={{
                    uri: userPost?.image_url || "",
                  }}
                ></Image>
                <Animated.View
                  style={{
                    position: "absolute",

                    opacity: firstOpacity,
                  }}
                >
                  <AntDesign
                    name="heart"
                    size={60}
                    color={
                      !likes.includes(userPost?._id || "") ? "black" : "red"
                    }
                  />
                </Animated.View>
              </View>
            </MultiTapOverlay>
            <Text style={{ color: "#fff" }}>Comments</Text>
          </>
        )}
        scrollEnabled={true}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 50 }}
              source={{ uri: item.user.userProfilePicture || NULL_URL }}
            ></Image>
            <View style={{ marginLeft: 20, flex: 1 }}>
              <Text style={{ color: "#fff" }}>{item.user.userNickName}</Text>
              <Text style={{ color: "#fff" }} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: Dimensions.get("window").width,
          paddingHorizontal: 10,

          alignItems: "center",
          height: "5%",
          minHeight: 40,
        }}
      >
        <View style={{ width: "10%" }}>
          <Image
            style={{
              width: "90%",
              height: "90%",
              borderRadius: 50,
            }}
            source={{ uri: NULL_URL }}
          ></Image>
        </View>
        <Stack space={1} w="75%" maxW="300px" mx="auto" paddingLeft={"2"}>
          <Input
            value={commentInput}
            maxLength={100}
            style={{ color: "#fff" }}
            underlineColorAndroid="#fff"
            variant="underlined"
            placeholder="Comment"
            onChangeText={(e) => setCommentInput(e)}
          />
        </Stack>
        <TouchableOpacity
          style={{ width: "15%", paddingLeft: 10 }}
          disabled={!(commentInput.length > 2)}
          onPress={() => addComment()}
        >
          <Text style={{ color: commentInput.length > 2 ? "#fff" : "red" }}>
            send
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({});
